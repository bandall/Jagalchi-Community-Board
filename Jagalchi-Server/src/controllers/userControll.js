import User from "../models/User";
import fs from "fs";
import bycript from "bcrypt";
import IP from "request-ip";

export const getJoin = (req, res) => {
   
}

export const postJoin = async (req, res) => {
    const { username, email, birthDate, password, password_confirm } = req.body;
    try {
        const exist = await User.exists({$or: [{username}, {email}]});
        //check validation
        if(exist) {
            return res.status(409).send({ errMsg: "중복된 이름 또는 이메일입니다." });
        }
    } catch (error) {
        console.log(error);
        return res.status(409).send({ errMsg: "계정 생성중 오류가 발생했습니다." });
    }
    
    if(password !== password_confirm) {
        return res.status(409).send({ errMsg: "비밀번호를 확인하여 주십시오." });
    }
    const emailCheck = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const dateCheck = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if(!emailCheck.test(email) || !dateCheck.test(birthDate)) {
        return res.status(409).send({ errMsg: "잘못된 형식입니다." });
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

export const getEditUser = async (req, res) => {
    const { _id } = req.session.user;
    const retJSON = {
        userInfo: {},
    }

    try {
        const user = await User.findById(_id);
        if(!user) {
            return res.status(404).send({errMsg: "유저를 찾을 수 없습니다."});
        }
        const info = {
            username: user.username, 
            email: user.email,
            birthDate: user.birthDate,
            phoneNumber: user.phoneNumber
        }
        retJSON.userInfo = info;
        return res.send(retJSON);
    } catch (error) {
        console.log(error);
        return res.status(404).send({errMsg: "오류가 발생했습니다."});
    }
}

export const postEditUser = async (req, res) => {
    const {
        session: {
            user: { _id }
        },
        body: { username, birthDate, phonenum, confirmPassword }
    } = req;
    //유저 검사
    const user = await User.findById(_id);
    if(!user) {
        return res.status(404).send({ errMsg: "존재하지 않는 유저입니다." });
    }

    const check = await bycript.compare(confirmPassword, user.password);
    if(!check) {
        return res.status(400).send({ errMsg: "비밀번호를 잘못입력했습니다." });
    }

    if(user.username !== username) {
        const exist = await User.exists({ username });
        if(exist) {
            return res.status(409).send({ errMsg: "이미 존재하는 닉네임입니다." });
        }
    }
    
    const phonePattern = /^[0-9]{2,3}[0-9]{3,4}[0-9]{4}/;
    const birthPattern = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if(!phonePattern.test(phonenum) || !birthPattern.test(birthDate)) {
        return res.status(409).send({ errMsg: "잘못된 번호 또는 생일 형식입니다." });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            _id,
            {
                username: username,
                birthDate: birthDate,
                phoneNumber: phonenum
            },
            { new: true }
        ).populate("posts");
        req.session.user = updatedUser;

        updatedUser.posts.forEach((post)=> {
            console.log(post);
            post.ownerName = updatedUser.username;
            post.save();
        });
        await updatedUser.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.status(409).send({ errMsg: "예기치 못한 오류가 발생했습니다." });
    }
} 

export const logout = async (req, res) => {
    const { _id } = req.session.user;
    const user = await User.findById(_id);
    try {
        const tmpList = user.tmpFiles;
        tmpList.forEach(tmpFile => {
            fs.unlink(tmpFile, (err) => {
                if(err) console.log(tmpFile + "삭제 실패");
            })
        });
        user.tmpFiles = [];
        await user.save();
        await req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.redirect("/");
        });
    } catch (error) {
        console.log(error);
    }
}

export const getLogin = (req, res) => {
    //res.send("Get Login");
    //res.sendFile(process.env.ASSET_PATH + "/index.html");
} 

export const postLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if(!user) {
        return res.status(404).send({ errMsg: "존재하지 않는 이메일입니다." });
    }
    const check = await bycript.compare(password, user.password);
    if(!check) {
        return res.status(403).send({ errMsg: "비밀번호를 잘못입력했습니다." });
    }

    if(!user.isAuthed) {
        req.session.user = user;
        return res.status(302).send({ msg: "최초 로그인 시 2차 인증이 필요합니다." });
    }
    if(!user.authedIPs.includes(String(IP.getClientIp(req)))) {
        req.session.user = user;
        return res.status(302).send({ msg: "새로운 IP에서 로그인하여 2차 인증이 필요합니다." });
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
        console.log(error);
        return res.status(400).send({ errMsg: "예기치 못한 오류가 발생했습니다." });
    }
    
    req.session.loggedIn = true;
    req.session.user = user;
    const retJSON = {
        username: user.username,
        userID: user._id,
        point: user.points
    }
    return res.status(200).send(retJSON);
} 

export const getChangePassword = (req, res) => {
    res.send("Get ChagePassword");
} 

export const postChangePassword = async (req, res) => {
    const {
        session: { 
            user: { _id }
          },
        body: { curPassword , newPassword, newPasswordCheck }
    } = req;
    if(newPassword !== newPasswordCheck) {
        return res.status(400).send({ errMsg: "새 비밀번호 확인에 실패하였습니다." });
    }
    try {
        const user = await User.findById(_id);
        const valid = await bycript.compare(curPassword, user.password);
        if(!valid) {
            return res.status(400).send({ errMsg: "기존 비밀번호 확인에 실패하였습니다." });
        }
        user.password = newPassword;
        await user.save();
        await req.session.destroy(() => {
            res.clearCookie('connect.sid').sendStatus(200);
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ errMsg: "예상치 못한 오류가 발생했습니다." });
    }
} 

export const getUser = async (req, res) => {
    const { userID } = req.params;
    const retJSON = {
        username: "",
        posts: [],
    }
    try {
        const user = await User.findById(userID).populate("posts");
        if(!user) {
            return res.status(404).send({errMsg: "유저를 찾을 수 없습니다."});
        }
        const retPosts = [];
        user.posts.forEach(post => {
            const retPost = {
                _id: post._id,
                ownerName: post.ownerName,
                title: post.title,
                views: post.views,
                recommand: post.recommand,
                createdAt: post.createdAt
            }
            retPosts.push(retPost);
        });
        
        retJSON.username = user.username;
        retJSON.posts = retPosts;
        return res.send(retJSON);
    } catch(error) {
        return res.status(400).send({errMsg: "오류가 발생했습니다."});
    }
}

export const getAvatar = async (req, res) => {
    const { userID } = req.params;
    const retJSON = {
        avatarUrl: "",
    }

    try {
        const user = await User.findById(userID);
        if(!user) {
            return res.status(404).send({errMsg: "유저를 찾을 수 없습니다."});
        }
        retJSON.avatarUrl = user.avatarUrl;
        return res.send(retJSON);
    } catch (error) {
        console.log(error);
        return res.status(400).send({errMsg: "오류가 발생했습니다."});
    }
}

