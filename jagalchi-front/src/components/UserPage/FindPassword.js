import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import s from "./FindPassword.module.css";
import { checkEmail } from "../functions/validation";
import { useState } from "react";
import { getFindPassword, postFindPassword } from "../functions/userAPI";

function FindPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [authString, setAuthString] = useState("");
    const [isSend, setSend] = useState(false);

    const onEmailSubmit = async (event) => {
        event.preventDefault();
        if(!checkEmail(email)) {
            return alert("잘못된 이메일 형식입니다.");
        }
        const result = await getFindPassword(email);
        if(result) {
            alert(`인증코드를 ${email}로 발송했습니다.`);
            setSend(true);
        } 
    }

    const onAuthSubmit = async (event) => {
        event.preventDefault();
        if(authString === "") {
            alert("인증 코드를 입력해 주십시오.");
            return;
        }
        const result = await postFindPassword(email, authString);
        if(result) {
            alert(`[인증 성공] 임시 비밀번호는 ${email}로 전송되었습니다.`);
            navigate("/login");
        } 
    }

    return (
        <div>
            <Card className={s.wrap_card}>
                <Card.Header className={s.card_title}>비밀번호 찾기</Card.Header>
                {!isSend ? 
                    <div className={s.submit_email}>
                        <Form.Group controlId="inputemail">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                placeholder="example@email.com"
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <Button onClick={onEmailSubmit} className={s.submit_btn}>비밀번호 찾기</Button>
                        </Form.Group>
                        
                    </div>
                    :
                    <div>
                        <div className={s.submit_email}>
                            <Form.Group controlId="inputemail">
                                <Form.Label>인증코드</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={authString}
                                    onChange={e => setAuthString(e.target.value)}
                                    required
                                />
                                <Button onClick={onAuthSubmit} className={s.submit_btn}>비밀번호 인증</Button>
                            </Form.Group>
                        </div>
                    </div>

                }
            </Card>
        </div>
    )
}

export default FindPassword;