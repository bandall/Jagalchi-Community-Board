import axios from "axios"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "./gobal";

function Logout() {
    const navigate = useNavigate();
    const tryLogout = async() => {
        try {
            const url = SERVER_URL + "/user/logout";
            await axios.post(url);
            sessionStorage.clear();
            navigate('/');
        } catch (error) {
            console.log(error);
            navigate('/');
        }
    }
    useEffect(() => {
        tryLogout();
    });
}

export default Logout;