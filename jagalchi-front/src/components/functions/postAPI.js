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