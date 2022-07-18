import multer from "multer";
import path from "path";
const imageFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/gif") {
        cb(null, true);
    }
    else {
        req.fileValidationError = "jpg,jpeg,png,gif,webp만 업로드 가능합니다."
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
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
       },
   }),
    limits: { fileSize: 30*1024*1024 },
    fileFilter: imageFilter,
});


// ------ multer 저장 후 처리

export const postImage = async (req, res) => {
    const { img } = req.files;
    const imageLink = {
        url: img[0].destination + "/" + img[0].filename
    }
    return res.send(imageLink);
}