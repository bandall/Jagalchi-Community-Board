import multer from "multer";
import path from "path";
import User from "../models/User";
import fs from "fs";
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
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + Math.round(Math.random() * 10000000) + ext);
       },
   }),
    limits: { fileSize: 30*1024*1024 },
    fileFilter: imageFilter,
});

export const uploadVideo = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'uploads/video')
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + Math.round(Math.random() * 10000000) + ext);
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