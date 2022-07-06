import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "./gobal";
import { useNavigate } from "react-router-dom";
import Navbar1 from "./components/navbar/Navbar1";
function Join() {
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirm, setConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [btn, setBtn] = useState(true);
    const nameChange = (event) => {
        setUserName(event.target.value);
    }
    const idChange = (event) => {
        setId(event.target.value);
    }
    const pwdChange = (event) => {
        setPassword(event.target.value);
    }
    const pwd2Change = (event) => {
        setConfirm(event.target.value);
    }
    const emailChange = (event) => {
        setEmail(event.target.value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if(password.length >= 8 && password === password_confirm && id.length !== 0 && username.length !== 0 && email.length !== 0)
        {
            const body = {
                username: username,
                email: email,
                id:id,
                password: password,
                password_confirm: password_confirm,
            }
            try {
                const url = SERVER_URL + "/join";
                await axios.post(url, body);
                navigate('/');
            } catch (error) {
                //console.log(error.response);
                alert(error.response.data.errMsg);
            }
        }
    }
    useEffect(()=>{
        if(password.length >= 8 && password === password_confirm && id.length !== 0 && username.length !== 0 && email.length !== 0) {
            setBtn(false);
        }
        else {
            setBtn(true);
        }
    }, [username, id, password, password_confirm, email]);
    
    return(
        <div>
            <Navbar1 />
            <h1>Join</h1>
            <form method="POST">
                <input name="userName" onChange={nameChange} placeholder="유저이름" type="text" required/>
                <input name="email" onChange={emailChange} placeholder="이메일" type="email" required/>
                <input name="id" onChange={idChange} placeholder="아이디" type="text" required/>
                <input name="password" onChange={pwdChange} placeholder="비밀번호 최소 8글자" type="password" required/>
                <input name="passwordConfirm" onChange={pwd2Change} placeholder="비밀번호 확인" type="password" required/>
                <button type="submit" onClick={onSubmit} disabled={btn}>Join</button>
            </form>
        </div>
    )
}
export default Join;