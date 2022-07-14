import axios from "axios"
import { SERVER_URL } from "../../gobal";
export const getUserInfo = async () => {
    let res;
    try {
        axios.defaults.withCredentials = true;
        const url = SERVER_URL + "/api/userinfo";
        res = await axios.get(url);
        console.log(res);
        return res;
        
    } catch (error) {
        return null;
    }
}


