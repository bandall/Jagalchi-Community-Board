import axios from "axios"
import { SERVER_URL } from "../../gobal";
export const getUser = async (userID) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/user/" + userID;
    try {
        const userData = await axios.get(url);
        if(userData.data.status === false) return null;
        else return userData.data;
    } catch(error) {
        console.log(error);
        return null;
    }
}

export const getAvatarUrl = async (userID) => {
    axios.defaults.withCredentials = true;
    const url = SERVER_URL + "/user/avatar/" + userID;
    const default_profile = "http://localhost:4000/uploads/avatar/default_profile.jpg";
    try {
        const retJSON = await axios.get(url);
        if(retJSON.data.status === false) return default_profile;
        else if(retJSON.data.avatarUrl === "") return default_profile;
        else return retJSON.data.avatarUrl;
    } catch(error) {
        console.log(error);
        return default_profile;
    }
}