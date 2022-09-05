import nodemailer from "nodemailer";
import "dotenv/config";
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

export default smtpTransport;