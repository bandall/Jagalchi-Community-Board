import nodemailer from "nodemailer";
import "dotenv/config"
import crypto from "crypto";

const smtpTransport = nodemailer.createTransport({
    service: 'naver',
    host: 'smtp.naver.com',
    port: 587,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PWD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

const getSecureRandom = () => {
    const random = crypto.randomBytes(4).toString("hex").toUpperCase();
    return random;
}

export const sendAuthEmail = async (req, res) => {
    const { email } = req.query;
    console.log(smtpTransport);
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: "[자갈치 시장] 회원님의 인증번호가 발급되었습니다.",
        text: "hello" + getSecureRandom(),
        html: ""
    }
    smtpTransport.sendMail(mailOptions, (err, response) => {
        console.log(err);
        console.log(response);
        smtpTransport.close();
    })
    return res.send("a");
}

export const sendEmail = async (email, subject, text, html) => {
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: subject,
        text: text,
        html: html
    }
    const status = true;
    smtpTransport.sendMail(mailOptions, (err, response) => {
        if(err) {
            console.log(err);
            status = false;
        }
        smtpTransport.close();
    })
    return status;
}