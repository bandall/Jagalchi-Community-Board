import { useState } from "react";
import axios from "axios"
import { SERVER_URL } from "../../gobal";
import { useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import s from "./Login.module.css";
function Login({setLoggedIn}) {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const emailChange = (event) => {
        setEmail(event.target.value);
    }
    const pwdChange = (event) => {
        setPassword(event.target.value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if(email === "" || password === "") {
            alert("이메일과 비밀번호를 입력해주세요.");
        }
        else {
            const body = {
                email: email,
                password: password
            }
            try {
                axios.defaults.withCredentials = true;
                const url = SERVER_URL + "/login";
                const res = await axios.post(url, body);
                setLoggedIn(true);
                localStorage.setItem("username", res.data.username);
                localStorage.setItem("userID", res.data.userID);
                localStorage.setItem("loggedIn", "true");
                navigate('/');
            } catch (error) {
                console.log(error.response.data.errMsg);
                alert(error.response.data.errMsg);
            }
        }
    }
    return(
        <div>
            <div className={s.Auth_form_container}>
                <ul>
                {show ? <Alert className={s.Alert} style={{position: "fixed"}} variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Error Header</Alert.Heading>
                    <p>
                        {"ErrMsg"}
                    </p>
                </Alert> : null}
                <form className={s.Auth_form}>
                    <div className={s.Auth_form_content}>
                    <h3 className={s.Auth_form_title}>로그인</h3>
                    <div className="text-center">
                        아직 계정이 없으신가요?{" "}
                        <a href="/join" className="link-primary">
                            가입하기{String.fromCharCode(8594)}
                        </a>
                    </div>
                    <div className="form-group mt-3">
                        <Form.Floating className="mb-3">
                        <Form.Control
                            id="email"
                            type="email"
                            onChange={emailChange}
                            placeholder="name@example.com"
                            required
                            />
                            <label htmlFor="floatingInputCustom">이메일</label>
                        </Form.Floating>
                    </div>
                    <div className="form-group mt-3">
                        {/* <label>Password</label> */}
                        <Form.Floating>
                            <Form.Control
                            id="current-password"
                            type="password"
                            onChange={pwdChange}
                            placeholder="Password"
                            required
                            />
                        <label htmlFor="floatingPasswordCustom">비밀번호</label>
                        </Form.Floating>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" onClick={onSubmit} className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Forgot <a href="/find-password">password?</a>
                    </p>
                    </div>
                </form>
                </ul>
            </div>
        </div>
    )
}
export default Login;