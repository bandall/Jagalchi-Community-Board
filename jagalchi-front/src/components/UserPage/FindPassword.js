import { Button, Card, Form } from "react-bootstrap";
import s from "./FindPassword.module.css";
import { checkEmail } from "../functions/validation";
import { useState } from "react";
import { getAuthString } from "../functions/userAPI";

function FindPassword(params) {
    const [email, setEmail] = useState("");
    const [authString, setAuthString] = useState("");
    const [isSend, setSend] = useState(false);

    const onClick = () => {
        alert("재전송");
    }

    const onEmailSubmit = async (event) => {
        event.preventDefault();
        if(checkEmail(email)) {
            await getAuthString(email);
            //setSend(true);
        } else {
            alert("잘못된 이메일입니다.");
        }
    }
    const onAuthSubmit = (event) => {
        alert("제출 " + authString);
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
                                <Form.Label>인증문자</Form.Label>
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