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

export const sendAuthEmail = async (req, res) => {
    const { email } = req.query;
    const random = crypto.randomBytes(4).toString("hex").toUpperCase();
    const html = `
        <div>
            <div style="display: flex;">
                <img src="http://localhost:4000/static/favicon.ico" style="width: 50px; height: 50px; margin-top: 21px; margin-bottom: 21px;">
                <h1>자갈치 시장</h1>
            </div>

            <div>
                <h2>안녕하세요 {}님.</h2>
                <h2>{}님의 인증번호는 ${random}입니다.</h2>
            </div>
        </div>
    `;

    
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: "[자갈치 시장] 회원님의 인증번호가 발급되었습니다.",
        text: "",
        html: html
    }

    smtpTransport.sendMail(mailOptions, (err, response) => {
        if(err) {
            console.log(err);
        }
        smtpTransport.close();
    })

    return res.sendStatus(200);
}