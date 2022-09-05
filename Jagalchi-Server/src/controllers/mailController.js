import smtpTransport from "../config/email";
import "dotenv/config"
import crypto from "crypto";


const getSecureRandom = () => {
    const random = crypto.randomBytes(4).toString("hex").toUpperCase();
    return random;
}

export const sendAuthEmail = async (req, res) => {
    const { email } = req.query;
    console.log(process.env.SMTP_USER);
    console.log(process.env.SMTP_PWD);
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: "[자갈치 시장] 회원님의 인증번호가 발급되었습니다.",
        text: "hello" + getSecureRandom(),
        html: ""
    }
    smtpTransport.sendMail(mailOptions, (err, response) => {
        console.log(err);
        smtpTransport.close();
    })
    return res.send("a");
}