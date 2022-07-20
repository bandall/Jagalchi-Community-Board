import axios from "axios"
import { SERVER_URL } from "../../gobal";

export const getPosts = async (page, offset) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/post";
    try {
        const pageInfo = await axios.get(url, 
            {params: {page:page, offset:offset}}
        );
        return pageInfo;
    } catch (error) {
        return null;
    }
}