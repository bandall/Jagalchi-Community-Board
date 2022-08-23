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