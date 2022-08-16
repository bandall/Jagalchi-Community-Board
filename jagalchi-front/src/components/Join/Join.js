import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../gobal.js";
import { useNavigate } from "react-router-dom";
import Navbar1 from "../Navbar/CustomNavbar";
import Waveback from "../BackImage/Waveback.js";
import s from "./Join.module.css"
import { Form } from "react-bootstrap";
function Join() {
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [password_confirm, setConfirm] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirth] = useState("");
    const nameChange = (event) => {
        setUserName(event.target.value);
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
    const birthChange = (event) => {
        setBirth(event.target.value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(username.length === 0 || email.length === 0 || birthDate.length === 0) {
            return alert("입력칸을 모두 채워주세요.");
        }
        if(password.length < 8) {
            return alert("비밀번호가 짧음");
        }
        if(password !== password_confirm) {
           return alert("비밀번호 확인 실패");
        }
        const body = {
            username: username,
            email: email,
            birthDate:birthDate,
            password: password,
            password_confirm: password_confirm,
        }
        try {
            const url = SERVER_URL + "/join";
            await axios.post(url, body);
            navigate('/');
        } catch (error) {
            alert(error.response.data.errMsg);
        }
    }
    return(
        <div>
            <Navbar1 />
            <Waveback />
            <div className={s.Auth_form_container}>
                <form className={s.Auth_form}>
                    <div className={s.Auth_form_content}>
                    <h3 className={s.Auth_form_title}>계정 만들기</h3>
                    <div className="text-center">
                        이미 계정이 있으신가요?{" "}
                        <a href="/login" className="link-primary">
                            로그인{String.fromCharCode(8594)}
                        </a>
                    </div>
                    <div className="form-group mt-3">
                        <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="name"
                            onChange={nameChange}
                            required
                            />
                            <label htmlFor="floatingInputCustom">이름</label>
                        </Form.Floating>
                    </div>
                    <div className="form-group mt-3">
                        <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="email"
                            placeholder="name@example.com"
                            onChange={emailChange}
                            required
                            />
                            <label htmlFor="floatingInputCustom">이메일</label>
                        </Form.Floating>
                    </div>
                    <div className="form-group mt-3">
                        <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="date"
                            placeholder="YYYY-MM-DD"
                            onChange={birthChange}
                            required
                            min="1920-01-01"
                            max="2022-01-01"
                            />
                            <label htmlFor="floatingInputCustom">생년월일</label>
                        </Form.Floating>
                    </div>
                    <div className="form-group mt-3">
                        <Form.Floating>
                            <Form.Control
                            id="floatingPasswordCustom"
                            type="password"
                            placeholder="Password"
                            onChange={pwdChange}
                            required
                            />
                        <label htmlFor="floatingPasswordCustom">비밀번호</label>
                        </Form.Floating>
                    </div>
                    <div className="form-group mt-3">
                        <Form.Floating>
                            <Form.Control
                            id="floatingPasswordCustom"
                            type="password"
                            placeholder="Password"
                            onChange={pwd2Change}
                            required
                            />
                        <label htmlFor="floatingPasswordCustom">비밀번호 확인</label>
                        </Form.Floating>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" onClick={onSubmit} className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right mt-2">
                        Forgot <a href="/">password?</a>
                    </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Join;