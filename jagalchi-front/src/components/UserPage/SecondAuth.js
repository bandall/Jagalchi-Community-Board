import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postSecondAuth } from "../functions/userAPI";
import s from "./SecondAuth.module.css";

function SecondAuth({setLoggedIn}) {
    const navigate = useNavigate();
    const [authCode, setAuthCode] = useState("");
    const onAuthSubmit = async (event) => {
        event.preventDefault();
        if(authCode === "") {
            alert("인증 코드를 입력해 주십시오.");
            return;
        }
        const result = await postSecondAuth(authCode);
        if(result) {
            setLoggedIn(true);
            localStorage.setItem("username", result.data.username);
            localStorage.setItem("userID", result.data.userID);
            localStorage.setItem("loggedIn", "true");
            alert(`[인증 성공]`);
            navigate("/");
        } 
    }

    return (
        <div>
            <Card className={s.wrap_card}>
                <Card.Header className={s.card_title}>이메일 2차 인증하기</Card.Header>
                <div className={s.card_text_wrap}>
                    <Card.Text className={s.card_text}>인증코드를 등록하신 이메일로 발송하였습니다.</Card.Text>
                    <Card.Text className={s.card_text}>인증코드를 입력하여 주십시오.</Card.Text>
                    <div className={s.submit_auth}>
                            <Form.Group controlId="inputemail">
                                <Form.Label>인증 코드</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={authCode}
                                    onChange={e => setAuthCode(e.target.value)}
                                    required
                                />
                                <Button onClick={onAuthSubmit} className={s.submit_btn}>비밀번호 인증</Button>
                            </Form.Group>
                        </div>
                </div>
            </Card>
        </div>
    )
}

export default SecondAuth;