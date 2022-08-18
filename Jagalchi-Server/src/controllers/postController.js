import Post from "../models/Post"
import User from "../models/User";
import fs from "fs";
//게시물 등록
export const submitPost = async (req, res) => {
    const { title, text, fileList } = req.body;
    const { _id, username } = req.session.user;
    
    try {
        const finalFiles = await deleteLeavedFiles(text, fileList);
        const newPost = await Post.create({
            owner: _id,
            ownerName: username,
            title,
            textHTML: text,
            attachedFile: finalFiles,
            comment: [],
        });

        const user = await User.findById(_id);
        const tmpFiles = user.tmpFiles;
        user.posts.unshift(newPost);
        //사용자 DB에 저장된 임시 파일들 삭제
        fileList.forEach(file => {
            const idx = tmpFiles.find(path => path === file);
            if(idx) {
                tmpFiles.splice(idx, 1);
            }
        });
        user.tmpFiles = tmpFiles;
        user.save();
    } catch(error) {
        console.log(error);
    }
    return res.sendStatus(200);
}
//게시글을 JSON으로 반환 (page: 현재 페이지, offset: 페이지당 개시물 수, key: 정렬기준)
export const getPostList = async (req, res) => {
    let { page, offset, key } = req.query;
    if(offset < 1 || offset > 20 || offset === null || offset === undefined) {
        offset = 10;
    }

    const postCount = await Post.countDocuments();
    const maxPage = Math.ceil(postCount / offset);

    if(page < 1 || page > maxPage || page === null || page === undefined) {
        page = 1;
    }
    let curPagePost;
    if(key === "all") {
        curPagePost = await Post.find({}).sort({ _id: -1 }).skip((page - 1)*offset).limit(offset);
    }
    else if(key === "hot") {
        curPagePost = await Post.find({}).sort({ views: -1, _id: -1 }).skip((page - 1)*offset).limit(offset);
    }
    else {
        return res.redirect("/");
    }

    for(let i = 0; i < curPagePost.length; i++) {
        curPagePost[i].owner = undefined;
        curPagePost[i].__v = undefined;
        curPagePost[i].recommandUsers = undefined;
        curPagePost[i].comment = undefined;
        curPagePost[i].textHTML = undefined;
        curPagePost[i].attachedFile = undefined;
    }
    const retJSON = {
        maxPage: maxPage,
        curPage: page,
        startNum: postCount - (page - 1) * offset,
        posts: curPagePost,
    }

    return res.send(retJSON);
}
//게시글 불러오기
export const getPost = async (req, res) => {
    const { postID } = req.params;
    try {
        const post = await Post.findById(postID);
        post.views = post.views + 1;
        const postData = {
            ownerName: post.ownerName,
            title: post.title,
            date: post.createdAt,
            textHTML: post.textHTML,
            comment: post.comment,
            view: post.views,
            recommand: post.recommand,
            attachedFile: post.attachedFile
        }

        const retJSON = {
            modify: false,
            recommanded: false,
            postData
        }
        //게시글 수정 권한 및 추천 여부 확인
        if(req.session.loggedIn) {
            const user = req.session.user;
            if(user._id == post.owner) 
                retJSON.modify = true;
            post.recommandUsers.forEach((list) => {
                if(list == user._id) {
                    retJSON.recommanded = true;
                }
            })
        }
        
        await post.save();
        return res.send(retJSON);
    } catch(error) {
        const retJSON = {
            errMsg: "게시물을 불러오지 못 했습니다."
        }
        console.log(error);
        return res.send(retJSON);
    }
}
//게시글 추천
export const recommandPost = async (req, res) => {
    const { postID } = req.params;
    const userID = req.session.user._id;
    try {
        const post = await Post.findById(postID);
        for(let i = 0; i < post.recommand; i++) {
            if(String(post.recommandUsers[i]) === String(userID)) {
                throw new Error("이미 추천한 게시물입니다.");
            }
        }
        
        post.recommandUsers.unshift(userID);
        post.recommand = post.recommand + 1;
        await post.save();
        return res.sendStatus(200);
    } catch (error) {
        return res.status(400).send({errMsg : error.message});
    }
}
//게시글 삭제
export const deletePost = async (req, res) => {
    const { postID } = req.params;
    const userID = req.session.user._id;
    const retJSON = {
        code: false,
        errMsg: "",
    };
    try {
        const post = await Post.findById(postID);
        const user = await User.findById(userID);
        if(!post) {
            retJSON.errMsg = "존재하지 않는 게시물입니다.";
            return res.send(retJSON);
        }
        if(!user) {
            retJSON.errMsg = "존재하지 않는 유저입니다.";
            return res.send(retJSON);
        }
        if(String(post.owner) !== String(userID)) {
            retJSON.errMsg = "파일 삭제 권한이 없습니다.";
            return res.send(retJSON);
        }
        //post, comment 기록을 삭제하는 것이 맞는 행동인가?
        // const userPostIdx = user.posts.findIndex((post) => {
        //     if(String(post) === String(postID)) return true;
        //     else return false;
        // });
        // if(userPostIdx) {
        //     user.post.splice(userPostIdx, 1);
        // }
        for(let i = 0; i < post.comment.length; i++) {
            await Comment.findOneAndDelete(String(post.comment[i]));
        }
        post.attachedFile.forEach(file => {
            fs.unlink(file, (err)=> {
                if(err) console.log(file + " 삭제 실패");
            })
        });
        await user.save();
        await Post.findByIdAndDelete(postID);
        retJSON.code = true;
        return res.send(retJSON);

    } catch(error) {
        console.log(error);
        retJSON.errMsg = "파일 삭제 중 오류가 발생했습니다.";
        return res.send(retJSON);
    }
}

//src에 존재하지 않는 파일을 삭제하고 최종 저장된 파일 목록 반환
const deleteLeavedFiles = async (HTMLText, fileList) => {
    const srcRex = /src=[\"']?([^>\"']+)[\"']?[^>]*/g;
    const srcFiles = HTMLText.match(srcRex) || [];
    const deletedFiles = [];
    const finalFiles = [];
    
    fileList.forEach(file => {
        let deleted = true;
        for(let i = 0; i < srcFiles.length; i++) {
            if(srcFiles[i].includes(file)) deleted = false;
        }
        if(deleted) deletedFiles.push(file);
        else finalFiles.push(file);
    });
    deletedFiles.forEach(file => {
        fs.unlink(file, (err)=> {
            if(err) console.log(file + " 삭제 실패");
        })
    });
    return finalFiles;
}

//html에 존재하는 파일과 attachedFile에 존재하는 파일을 비교
//수정중 삭제된 파일을 찾아 삭제
export const editPost = async (req, res) => {
    const { title, text, fileList, postID } = req.body;
    const { _id } = req.session.user;
    const retJSON = {
        status: false,
        errMsg: ""
    }
    try {
        const post = await Post.findById(postID);
        const user = await User.findById(_id);
        if(post === null) {
            retJSON.errMsg = "게시글이 존재하지 않습니다.";
            return res.send(retJSON);
        }
        
        //유저검사
        if(String(_id) !== String(post.owner)) {
            retJSON.errMsg = "게시글 수젇 권한이 없습니다.";
            return res.send(retJSON);
        }
        
        const finalFiles = await deleteLeavedFiles(text, fileList);
        const tmpFiles = user.tmpFiles;
        fileList.forEach(file => {
            const idx = tmpFiles.find(path => path === file);
            if(idx) {
                tmpFiles.splice(idx, 1);
            }
        });
        post.title = title;
        post.textHTML = text;
        post.attachedFile = finalFiles;
        user.tmpFiles = tmpFiles;
        await post.save();
        await user.save();

        retJSON.status = true;
        return res.send(retJSON);
    } catch (error) {
        retJSON.errMsg = "게시글을 수정하지 못 했습니다.";
        return res.send(retJSON);
    }
    
}

export const getSearch = async (req, res) => {
    let { page, offset, keyword } = req.query;
    if(offset < 1 || offset > 20 || offset === null || offset === undefined) {
        offset = 10;
    }

    const searchPosts = await Post.find({
        $or: [
            {
                title: {
                    $regex: new RegExp(`${keyword}`, "i")
                }
            },
            {
                textHTML: {
                    $regex: new RegExp(`${keyword}`, "i")
                }
            },
        ]
    }).sort({ _id: -1 });
    const postCount = searchPosts.length;
    const maxPage = Math.ceil(postCount / offset);

    if(page < 1 || page > maxPage || page === null || page === undefined) {
        page = 1;
    }
    const slicedPosts = searchPosts.slice((page - 1)*offset, (page - 1)*offset + offset);
    for(let i = 0; i < slicedPosts.length; i++) {
        slicedPosts[i].owner = undefined;
        slicedPosts[i].__v = undefined;
        slicedPosts[i].recommandUsers = undefined;
        slicedPosts[i].comment = undefined;
        slicedPosts[i].textHTML = undefined;
        slicedPosts[i].attachedFile = undefined;
    }
    const retJSON = {
        posts: slicedPosts,
        maxPage: maxPage,
        curPage: page,
        startNum: postCount - (page - 1) * offset,
    }

    return res.send(retJSON);
}

export const submitComment = async (req, res) => {
    const { postID, commentText, parentComment } = req.body;
    const { _id } = req.session.user;
    
}