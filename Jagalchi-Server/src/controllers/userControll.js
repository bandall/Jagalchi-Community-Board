import User from "../models/User";
import fs from "fs";
import bycript from "bcrypt";
export const getJoin = (req, res) => {
   
}

export const postJoin = async (req, res) => {
    const { username, email, birthDate, password, password_confirm } = req.body;
    const exist = await User.exists({$or: [{username}, {email}]});
    //check validation
    if(exist) {
        return res.status(409).send({ errMsg: "중복된 이름 또는 이메일입니다." });
    }
    if(password !== password_confirm) {
        return res.status(409).send({ errMsg: "비밀번호를 확인하여 주십시오." });
    }
    try {
        await User.create({
            username: username,
            email: email,
            birthDate: birthDate,
            password: password,
            points: 0
        });
    } catch(error) {
        console.log(error);
        return res.status(409).send({ errMsg: "계정 생성중 오류가 발생했습니다." });
    }
    
    return res.sendStatus(200);
}

export const getEdit = async (req, res) => {
    
} 

export const postEdit = async (req, res) => {
    const {
        session: {
            user: { _id, avatarUrl }
        },
        body: { username, newAvatarUrl }
    } = req;
    const exist = User.exist({ username });
    if(exist) {
        return res.status(409).send({ errMsg: "이미 존재하는 닉네임입니다." });
    }
    const user = User.findById(_id);
    if(!user) {
        return res.status(400).send({ errMsg: "존재하지 않는 유저입니다." });
    }
    //remove past image
    const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
            username: username,
            avatarUrl: newAvatarUrl
        },
        { new: true }
    );
    req.session.user = updatedUser;
    return res.redirect("/user/edit");
} 

export const logout = async (req, res) => {
    const { _id } = req.session.user;
    const user = await User.findById(_id);
    try {
        user.loginDates.unshift(new Date());
        const tmpList = user.tmpFiles;
        tmpList.forEach(tmpFile => {
            fs.unlink(tmpFile, (err) => {
                if(err) console.log(tmpFile + "삭제 실패");
            })
        });
        user.tmpFiles = [];
        await user.save();
    } catch (error) {

    }
    await req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect("/");
    });
}

export const getLogin = (req, res) => {
    //res.send("Get Login");
    //res.sendFile(process.env.ASSET_PATH + "/index.html");
} 

export const postLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if(!user) {
        return res.status(400).send({ errMsg: "존재하지 않는 이메일입니다." });
    }
    const check = await bycript.compare(password, user.password);
    if(!check) {
        return res.status(400).send({ errMsg: "비밀번호를 잘못입력했습니다." });
    }

    try {
        user.loginDates.unshift(new Date());
        const tmpList = user.tmpFiles;
        tmpList.forEach(tmpFile => {
            fs.unlink(tmpFile, (err) => {
                if(err) console.log(tmpFile + "삭제 실패");
            })
        });
        user.tmpFiles = [];
        await user.save();
    } catch (error) {

    }
    
    req.session.loggedIn = true;
    req.session.user = user;
    const body = {
        username: user.username,
        point: user.points
    }
    return res.status(200).send(body);
} 

export const getChangePassword = (req, res) => {
    res.send("Get ChagePassword");
} 

export const postChangePassword = async (req, res) => {
    const {
        session: { 
            user: { _id }
          },
        body: { oldPassword ,newPassword, newPasswordConfirm }
    } = req;
    if(newPassword !== newPasswordConfirm) {
        return res.status(400).send({ errMsg: "새 비밀번호 확인에 실패하였습니다." });
    }
    const user = await User.findById(_id);
    const valid = await bycript.compare(user.password, oldPassword);
    if(!valid) {
        return res.status(400).send({ errMsg: "기존 비밀번호 확인에 실패하였습니다." });
    }
    user.password = newPassword;
    user.save();
    return res.redirect("/user/logout");
} 