import axios from "axios"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "./gobal";

function Logout() {
    const navigate = useNavigate();
    const setLogin = async () => {
        sessionStorage.clear();
    }
    const tryLogout = async () => {
        try {
            axios.defaults.withCredentials = true;
            const url = SERVER_URL + "/user/logout";
            await axios.post(url);
            await setLogin();
            navigate('/');
        } catch (error) {
            console.log(error);
            navigate('/');
        }
    }
    useEffect(() => {
        tryLogout();
    }, []);
}

export default Logout;