import Post from "../models/Post"
import User from "../models/User";
export const submitPost = async (req, res) => {
    const { title, text, fileList } = req.body;
    const { _id, username } = req.session.user;
    try {
        const newPost = await Post.create({
            owner: _id,
            ownerName: username,
            title,
            textHTML: text,
            attachedFile: fileList,
            comment: [],
        });

        const user = await User.findById(_id);
        const tmpFiles = user.tmpFiles;
        user.posts.unshift(newPost);
        //찾아서 파일 삭제하고 DB에서도 지우고
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
    if(key === "hot") {
        curPagePost = await Post.find({}).sort({ views: -1 }).skip((page - 1)*offset).limit(offset);
    }
    const retPage = [];
    for(let i = 0; i < curPagePost.length; i++) {
        curPagePost[i].owner = undefined;
        curPagePost[i].remmandUsers = undefined;
        curPagePost[i].comment = undefined;
        curPagePost[i].textHTML = undefined;
        curPagePost[i].attachedFile = undefined;
    }

    const data = {
        maxPage: maxPage,
        curPage: page,
        posts: curPagePost,
        startNum: postCount - (page - 1) * offset
    }

    return res.send(data);
}

export const getPost = async (req, res) => {
    const { postID } = req.params;
    try {
        const post = await Post.findById(postID);
        post.views = post.views + 1;
        const postData = {
            ownerName: post.ownerName,
            title: post.title,
            textHTML: post.textHTML,
            comment: post.comment,
            view: post.views,
            recommand: post.recommand,
            attachedFile: post.attachedFile
        }

        const json = {
            modify: false,
            recommanded: false,
            postData
        }
        
        if(req.session.loggedIn) {
            const user = req.session.user;
            if(user._id == post.owner) 
                json.modify = true;
            post.recommandUsers.forEach((list) => {
                if(list == user._id) {
                    json.recommanded = true;
                }
            })
        }
        
        await post.save();
        return res.send(json);
    } catch(error) {
        const json = {
            errMsg: "게시물을 불러오지 못 했습니다."
        }
        console.log(error);
        return res.send(json);
    }
}

export const recommandPost = async () => {
    const { postID } = req.query;


}