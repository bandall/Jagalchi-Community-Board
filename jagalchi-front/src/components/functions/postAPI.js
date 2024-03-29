import axios from "axios";
import { SERVER_URL } from "../../gobal";

export const getPosts = async (page, offset, key) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/post";
    try {
        const pageInfo = await axios.get(url, 
            {params: {page:page, offset:offset, key:key}}
        );
        return pageInfo;
    } catch (error) {
        return null;
    }
}

export const getPost = async (postID) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/api/post/" + postID;
    try {
        const page = await axios.get(url);
        return page;
    } catch(error) {
        if(error.code === "ERR_NETWORK") alert("예기치 못한 오류가 발생했습니다.");
        else alert(error.response.data.errMsg);
        return false;
    }
}

export const postRecommand = async (postID) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/api/post/recommand/" + postID;
    try {
        await axios.post(url);
        return true;
    } catch(error) {
        if(error.code === "ERR_NETWORK") alert("예기치 못한 오류가 발생했습니다.");
        else alert(error.response.data.errMsg);
        return false;
    }
}

export const deletePost = async (postID) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/api/post/delete/" + postID;
    try {
        await axios.post(url);
        return true;
    } catch (error) {
        if(error.code === "ERR_NETWORK") alert("예기치 못한 오류가 발생했습니다.");
        else alert(error.response.data.errMsg);
        return false;
    }
}

export const editPost = async (postID, data) => {
    try {
        axios.defaults.withCredentials = true;
        const url = SERVER_URL + "/api/post/edit/" + postID;
        await axios.post(url, data);
        return true;
    } catch (error) {
        if(error.code === "ERR_NETWORK") alert("예기치 못한 오류가 발생했습니다.");
        else alert(error.response.data.errMsg);
        return false;
    }
}

export const searchPost = async (keyword, page) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/api/post/search";
    try {
        const pageInfo = await axios.get(url,
            {params: {keyword:keyword, page:page}}
        );
        return pageInfo;
    } catch (error) {
        if(error.code === "ERR_NETWORK") alert("예기치 못한 오류가 발생했습니다.");
        else alert(error.response.data.errMsg);
        return false;
    }
} 

export const submitComment = async (postID, commentText, parentComment) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/api/post/comment/submit";
    try {
        const data = {
            postID:postID, 
            commentText:commentText, 
            parentComment:parentComment
        };
        const retJSON = await axios.post(url, data);
        return retJSON.data;
    } catch (error) {
        if(error.code === "ERR_NETWORK") alert("예기치 못한 오류가 발생했습니다.");
        else alert(error.response.data.errMsg);
        return null;
    }
}

export const getComment = async (postID) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/api/post/comment/" + postID;
    try {
        const comments = await axios.get(url);
        return comments;
    } catch (error) {
        if(error.code === "ERR_NETWORK") alert("예기치 못한 오류가 발생했습니다.");
        else alert(error.response.data.errMsg);
        return null;
    }
}

export const deleteComment = async (commentID) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/api/post/comment/delete/" + commentID;
    try {
        await axios.post(url);
        return true;
    } catch (error) {
        if(error.code === "ERR_NETWORK") alert("예기치 못한 오류가 발생했습니다.");
        else alert(error.response.data.errMsg);
        return false;
    }
}