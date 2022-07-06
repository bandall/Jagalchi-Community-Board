import { useState } from "react";
import axios from "axios"
import { SERVER_URL } from "../../gobal";
import { useNavigate } from "react-router-dom";
import Navbar1 from "../navbar/Navbar1";
import Waveback from "../Waveback/Waveback"
import { Form, Alert } from "react-bootstrap";
import s from "./Login.module.css";
import coverImg from "../../assets/bg-coworking.jpeg";
function Login() {
    const navigate = useNavigate();
    const [show, setShow] = useState(true);
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
            //console.log(id + password);
            alert("아이디와 비밀번호를 입력해주세요.");
        }
        else {
            const body = {
                email: email,
                password: password
            }
            try {
                const url = SERVER_URL + "/login";
                const res = await axios.post(url, body);
                sessionStorage.setItem("loggedIn", "true");
                console.log(res);
                navigate('/');
            } catch (error) {
                console.log(error);
                alert("아이디 또는 비밀번호가 다릅니다.");
            }
        }
    }
    return(
        // <div className={s.Background} style={{backgroundImage: `url(${coverImg})`}}>
        <div>
            <Navbar1/>
            <Waveback />
            <div className={s.Auth_form_container}>
                <ul>
                {show ? <Alert className={s.Alert} style={{position: "fixed"}} variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        Change this and that and try again. Duis mollis, est non commodo
                        luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
                        Cras mattis consectetur purus sit amet fermentum.
                    </p>
                </Alert> : null}
                <form className={s.Auth_form}>
                    <div className={s.Auth_form_content}>
                    <h3 className={s.Auth_form_title}>Log In</h3>
                    <div className="text-center">
                        Not registered yet?{" "}
                        <a href="/join" className="link-primary">
                            Sign Up{String.fromCharCode(8594)}
                        </a>
                    </div>
                    <div className="form-group mt-3">
                        <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="email"
                            placeholder="name@example.com"
                            />
                            <label htmlFor="floatingInputCustom">Email address</label>
                        </Form.Floating>
                    </div>
                    <div className="form-group mt-3">
                        {/* <label>Password</label> */}
                        <Form.Floating>
                            <Form.Control
                            id="floatingPasswordCustom"
                            type="password"
                            placeholder="Password"
                            />
                        <label htmlFor="floatingPasswordCustom">Password</label>
                        </Form.Floating>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                        Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Forgot <a href="#">password?</a>
                    </p>
                    </div>
                </form>
                </ul>
            </div>
            {/* <form method="POST">
                <input name="id" onChange={idChange} placeholder="아이디" type="text" required/>
                <input name="password" onChange={pwdChange} placeholder="비밀번호" type="password" required/>
                <button onClick={onSubmit} type="submit">Login</button>
            </form> */}
        </div>
    )
}
export default Login;