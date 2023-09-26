import axios from "axios"
import { SERVER_URL } from "../../gobal";
export const getUserInfo = async () => {
    let res;
    try {
        axios.defaults.withCredentials = true;
        console.log(SERVER_URL);
        const url = SERVER_URL + "/api/userinfo";
        res = await axios.get(url);
        return res;
        
    } catch (error) {
        return null;
    }
}


