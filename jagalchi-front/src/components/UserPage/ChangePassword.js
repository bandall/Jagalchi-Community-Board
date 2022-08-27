import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { postPasswordChange } from "../functions/userAPI";

import s from "./ChangePassword.module.css";

function ChangePassword({setLoggedIn}) {
    const [curPassword, setCurPwd] = useState("");
    const [newPassword, setNewPwd] = useState("");
    const [newPasswordCheck, setNewPwdCheck] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        if(newPassword.length < 8) {
            return alert("비밀번호가 너무 짧습니다.(최소 8글자)");
        }
        if(newPassword !== newPasswordCheck) {
           return alert("비밀번호 확인을 실패했습니다.");
        }
        const result = await postPasswordChange(curPassword, newPassword, newPasswordCheck);
        console.log(result);
        if(result) {
            alert("비밀번호가 변경되었습니다. 다시 로그인하여 주십시오.");
            setLoggedIn(false);
            navigate("/login");
        }
    }

    return (
        <div>
            <Card className={s.wrap_card}>
                <Card.Header className={s.card_title}>비밀번호 변경</Card.Header>
                <Form className={s.pwd_form}>
                    <Form.Group controlId="current-password" className={s.pwd_input}>
                        <Form.Label>현재 비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            value={curPassword}
                            onChange={e => setCurPwd(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="new-password" className={s.pwd_input}>
                        <Form.Label>새 비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            value={newPassword}
                            onChange={e => setNewPwd(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="new-passwrod-confirm" className={s.pwd_input}>
                        <Form.Label>새 비밀번호 확인</Form.Label>
                        <Form.Control
                            type="password"
                            value={newPasswordCheck}
                            onChange={e => setNewPwdCheck(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button className={s.submit_btn} type="submit" onClick={onSubmit}>비밀번호 변경</Button>
                </Form>
            </Card>
        </div>
    )
}

export default ChangePassword;