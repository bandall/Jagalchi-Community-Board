import { Button, Card, Form } from "react-bootstrap";
import CustomNavbar from "../Navbar/CustomNavbar";
import BackImg from "../BackImage/Waveback";
import s from "./FindPassword.module.css";
import { checkEmail } from "../functions/validation";
import { useState } from "react";

function FindPassword(params) {
    const [email, setEmail] = useState("");
    const [isSend, setSend] = useState(false);

    const onClick = () => {
        alert("재전송");
    }

    const onEmailSubmit = (event) => {
        event.preventDefault();
        if(checkEmail(email)) {
            setSend(true);
        } else {
            alert("잘못된 이메일입니다.");
        }
    }

    return (
        <div>
            <CustomNavbar/>
            <BackImg/>
            <Card className={s.wrap_card}>
                <Card.Header className={s.card_title}>비밀번호 찾기</Card.Header>
                {isSend ? null : 
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
                }

                {!isSend ? null : 
                    <div>
                        <div className={s.card_text_wrap}>
                            <Card.Text className={s.card_text}>임시 비밀번호를 등록하신 이메일로 발송하였습니다.</Card.Text>
                            <Card.Text className={s.card_text}>로그인 후 임시비밀번호를 변경하여 주십시오.</Card.Text>
                            <Card.Text className={s.card_text}>인증메일을 재전송하기 위해서는 <em className={s.resend_txt} onClick={onClick}>여기</em>를 클릭해 재전송할 수 있습니다.</Card.Text>
                        </div>
                        <br/>
                        <a href="/login" className={s.login_link}>로그인하러 가기 {String.fromCharCode(8594)}</a>
                    </div>
                }
            </Card>
        </div>
    )
}

export default FindPassword;