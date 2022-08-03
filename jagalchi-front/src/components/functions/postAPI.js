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
        return null;
    }
}

export const postRecommand = async (postID) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/api/post/recommand/" + postID;
    try {
        await axios.post(url);
        return true;
    } catch(error) {
        return false;
    }
}

export const deletePost = async (postID) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/api/post/delete/" + postID;
    try {
        const result = await axios.post(url);
        return result;
    } catch (error) {
        return false;
    }
}

export const editPost = async (postID) => {
    axios.defaults.withCredentials = true;
    
}

export const searchPost = async (keyword) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/api/post/search";
    try {
        const pageInfo = await axios.get(url,
            {params: {keyword:keyword}}
        );
        return pageInfo;
    } catch (error) {
        return null;
    }
} 