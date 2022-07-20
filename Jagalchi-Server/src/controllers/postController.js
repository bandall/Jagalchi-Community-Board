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

export const getPost = async (req, res) => {
    let { page, offset } = req.query;
    console.log(page, offset);
    if(offset < 1 || offset > 20 || offset === null || offset === undefined) {
        offset = 10;
    }
    const postCount = await Post.countDocuments();

    const maxPage = Math.ceil(postCount / offset);
    if(page < 1 || page > maxPage || page === null || page === undefined) {
        page = 1;
    }
    const curPagePost = await Post.find({}).sort({ _id: -1 }).skip((page - 1)*offset).limit(offset);
    const data = {
        maxPage: maxPage,
        curPage: page,
        posts: curPagePost,
        startNum: postCount - (page - 1) * offset
    }
    console.log(postCount, page, maxPage);
    return res.send(data);
}

