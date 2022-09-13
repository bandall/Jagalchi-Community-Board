import { sendEmail } from "./mailController";
import User from "../models/User";
import crypto from "crypto";
import IP from "request-ip";
export const getFindPassword = async (req, res) => {
    const { email } = req.query;
    try {
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(404).send({errMsg: "존재하지 않는 이메일입니다."});
        }

        const authString = crypto.randomBytes(4).toString("hex").toUpperCase();
        user.authString = authString;

        const html = `
            <div>
                <div style="display: flex;">
                    <img src="http://localhost:4000/static/favicon.ico" style="width: 50px; height: 50px; margin-top: 21px; margin-bottom: 21px;">
                    <h1 style="color: #585858;">[자갈치 시장]</h1>
                </div>
                <div>
                    <h2>안녕하세요 <span style="color: green;">${user.username}</span>님.</h2>
                    <h2><span style="color: green;">${user.username}</span>님의 인증 코드는 <span style="color: blue;">${authString}</span>입니다.</h2>
                </div>
            </div>
        `;
        const status = await sendEmail(email, "[자갈치 시장] 비밀번호 변경 인증 코드", "", html);
        if(!status) {
            return res.status(404).send({errMsg: "이메일 전송에 실패했습니다."});
        }
        await user.save();
        return res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(400).send({errMsg: "예상치 못한 오류가 발생했습니다."});
    }
}

export const postFindPassword = async (req, res) => {
    const { email, authString } = req.body;
    try {
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(404).send({errMsg: "존재하지 않는 이메일입니다."});
        }
        if(user.authString !== authString) {
            return res.status(403).send({errMsg: "인증번호 인증에 실패했습니다."});
        }
        user.authString = "";
        const tmpPassword = crypto.randomBytes(4).toString("hex").toUpperCase();
        user.password = tmpPassword;

        const html = `
            <div>
                <div style="display: flex;">
                    <img src="http://localhost:4000/static/favicon.ico" style="width: 50px; height: 50px; margin-top: 21px; margin-bottom: 21px;">
                    <h1 style="color: #585858;">[자갈치 시장]</h1>
                </div>
                <div>
                    <h2>안녕하세요 <span style="color: green;">${user.username}</span>님.</h2>
                    <h2><span style="color: green;">${user.username}</span>님의 임시비밀번호는 <span style="color: blue;">${tmpPassword}</span>입니다.</h2>
                    <h2>임시비밀번호로 로그인 후 비밀번호를 변경해주세요.</h2>
                </div>
            </div>
        `;
        const status = await sendEmail(email, "[자갈치 시장] 임시 비밀번호 발급", "", html);
        if(!status) {
            return res.status(404).send({errMsg: "이메일 전송에 실패했습니다."});
        }
        await user.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.status(400).send({errMsg: "예상치 못한 오류가 발생했습니다."});
    }
    
}

export const getSecondAuth = async (req, res) => {
    try {
        if(!req.session.user) {
            return res.status(404).send({errMsg: "잘못된 접근입니다."});
        }
        const { email } = req.session.user;
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(404).send({errMsg: "존재하지 않는 이메일입니다."});
        }
        const authCode = crypto.randomBytes(4).toString("hex").toUpperCase();
        user.authString = authCode;

        const html = `
            <div>
                <div style="display: flex;">
                    <img src="http://localhost:4000/static/favicon.ico" style="width: 50px; height: 50px; margin-top: 21px; margin-bottom: 21px;">
                    <h1 style="color: #585858;">[자갈치 시장]</h1>
                </div>
                <div>
                    <h2>안녕하세요 <span style="color: green;">${user.username}</span>님.</h2>
                    <h2><span style="color: green;">${user.username}</span>님의 2차 인증 코드는 <span style="color: blue;">${authCode}</span>입니다.</h2>
                </div>
            </div>
        `;
        const status = await sendEmail(email, "[자갈치 시장] 2차 인증 코드", "", html);
        if(!status) {
            return res.status(404).send({errMsg: "이메일 전송에 실패했습니다."});
        }
        await user.save();
        return res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(400).send({errMsg: "예상치 못한 오류가 발생했습니다."});
    }
}

export const postSecondAuth = async (req, res) => {
    const { authCode } = req.body;
    
    try {
        if(!req.session.user) {
            return res.status(404).send({errMsg: "잘못된 접근입니다."});
        }
        const { email } = req.session.user;
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(404).send({errMsg: "존재하지 않는 이메일입니다."});
        }
        if(user.authString !== authCode) {
            return res.status(403).send({errMsg: "인증번호 인증에 실패했습니다."});
        }
        user.authString = "";
        user.isAuthed = true;
        if(!user.authedIPs.includes(String(IP.getClientIp(req)))) {
            user.authedIPs.push(String(IP.getClientIp(req)));
        }
        req.session.loggedIn = true;
        const retJSON = {
            username: user.username,
            userID: user._id,
            point: user.points
        }
        await user.save();
        return res.send(retJSON);
    } catch (error) {
        console.log(error);
        return res.status(400).send({errMsg: "예상치 못한 오류가 발생했습니다."});
    }
}