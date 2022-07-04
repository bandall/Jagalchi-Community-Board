import { useEffect, useState } from "react";
import axios from "axios"
import { SERVER_URL } from "./gobal";
import { useNavigate } from "react-router-dom";
function Login() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const idChange = (event) => {
        setId(event.target.value);
    }
    const pwdChange = (event) => {
        setPassword(event.target.value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if(id === "" || password === "") {
            //console.log(id + password);
            alert("아이디와 비밀번호를 입력해주세요.");
        }
        else {
            const body = {
                id: id,
                password: password
            }
            try {
                const url = SERVER_URL + "/login";
                const res = await axios.post(url, body);
                sessionStorage.setItem("loggedIn", "true");
                sessionStorage.setItem("username", res.data.username);
                sessionStorage.setItem("userID", res.data.id);
                sessionStorage.setItem("points", res.data.points);
                console.log(res);
                navigate('/');
            } catch (error) {
                console.log(error);
                alert("아이디 또는 비밀번호가 다릅니다.");
            }
        }
    }
    return(
        <div>
            <h1>Login</h1>
            <form method="POST">
                <input name="id" onChange={idChange} placeholder="아이디" type="text" required/>
                <input name="password" onChange={pwdChange} placeholder="비밀번호" type="password" required/>
                <button onClick={onSubmit} type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login;