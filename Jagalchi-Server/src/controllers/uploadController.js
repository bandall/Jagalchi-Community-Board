import multer from "multer";
import path from "path";
import User from "../models/User";
import fs from "fs";
import crypto from "crypto";
const imageFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/gif") {
        cb(null, true);
    }
    else {
        req.fileValidationError = "jpg,jpeg,png,gif,webp만 업로드 가능합니다.";
        cb(null, false);
    }
}

const videoFileter = (req, file, cb) => {
    if(file.mimetype === "video/mp4") {
        cb(null, true);
    }
    else {
        req.fileValidationError = "mp4만 업로드 가능합니다.";
        cb(null, false);
    }
}

export const uploadImage = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'uploads/image')
       },
        filename(req, file, cb){
            // 확장자 추출
            const ext = path.extname(file.originalname);
            // 이름설정 (basename:확장자제외 파일명) + 현재시간 + 확장자
            
            cb(null, crypto.createHash('md5').update(path.basename(file.originalname, ext)).digest('hex') + new Date().valueOf() + Math.round(Math.random() * 10000000) + ext);
       },
   }),
    limits: { fileSize: 30*1024*1024 },
    fileFilter: imageFilter,
});

export const uploadAvatar = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/avatar')
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, crypto.createHash('md5').update(path.basename(file.originalname, ext)).digest('hex') + new Date().valueOf() + Math.round(Math.random() * 10000000) + ext);
        }
    }),
    limits: { fileSize: 5*1024*1024 },
    fileFilter: imageFilter,
});

export const uploadVideo = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'uploads/video')
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname);
            cb(null, crypto.createHash('md5').update(path.basename(file.originalname, ext)).digest('hex') + new Date().valueOf() + Math.round(Math.random() * 10000000) + ext);
        }
    }),
    limits: { fileSize: 50*1024*1024 },
    fileFilter: videoFileter,
})

// ------ multer 저장 후 처리

export const postImage = async (req, res) => {
    const { img } = req.files;
    const { _id } = req.session.user;
    
    const imageLink = {
        url: img[0].destination + "/" + img[0].filename
    }

    try {
        const user = await User.findById(_id);
        user.tmpFiles.push(imageLink.url);
        await user.save();
    } catch(error) {
        fs.unlink(imageLink.url, (err) => {
            console.log("오류 발생으로 파일 삭제..");
        })
    }

    return res.send(imageLink);
}

export const postVideo = async (req, res) => {
    const { video } = req.files;
    const { _id } = req.session.user;
    
    const videoLink = {
        url: video[0].destination + "/" + video[0].filename
    }

    try {
        const user = await User.findById(_id);
        user.tmpFiles.push(videoLink.url);
        await user.save();
    } catch(error) {
        fs.unlink(videoLink.url, (err) => {
            console.log("오류 발생으로 파일 삭제..");
        })
    }

    return res.send(videoLink);
}

export const postAvatar = async (req, res) => {
    const { avatar } = req.files;
    const { _id } = req.session.user;

    const avatarLink = {
        url: avatar[0].destination + "/" + avatar[0].filename
    }

    try {
        const user = await User.findById(_id);
        console.log(user.avatarLink);
        if(user.avatarUrl !== "") {
            fs.unlink(user.avatarUrl, (err) => {
                if(err !== null) {
                    console.log(null);
                    console.log("기존 아바타 삭제중 오류 발생...");
                }
            })
        }
        user.avatarUrl = avatarLink.url;
        await user.save();
    } catch(error) {
        fs.unlink(avatarLink.url, (err) => {
            console.log("아바타 업로드 오류로 인한 새 아바타 삭제 중 오류 발생");
        })
    }

    return res.send(avatarLink);
}