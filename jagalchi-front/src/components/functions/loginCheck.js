import axios from "axios"
import { SERVER_URL } from "../../gobal";
export const getUserInfo = async () => {
    try {
        const url = SERVER_URL + "/user/info";
        const res = await axios.post(url);
        console.log(res);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}