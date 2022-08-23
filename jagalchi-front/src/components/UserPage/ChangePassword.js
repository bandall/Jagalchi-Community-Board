import { Button, Card, Form } from "react-bootstrap";
import CustomNavbar from "../Navbar/CustomNavbar";
import BackImg from "../BackImage/Waveback";
import s from "./ChangePassword.module.css";

function ChangePassword(params) {
    
    return (
        <div>
            <CustomNavbar/>
            <BackImg/>
            <Card className={s.wrap_card}>
                <Card.Header className={s.card_title}>비밀번호 변경</Card.Header>
                <Form className={s.pwd_form}>
                    <Form.Group controlId="inputcurpwd" className={s.pwd_input}>
                        <Form.Label>현재 비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="inputcurpwd" className={s.pwd_input}>
                        <Form.Label>새 비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="inputcurpwd" className={s.pwd_input}>
                        <Form.Label>새 비밀번호 확인</Form.Label>
                        <Form.Control
                            type="password"
                            required
                        />
                    </Form.Group>
                </Form>
                <Button className={s.submit_btn}>비밀번호 변경</Button>
            </Card>
        </div>
    )
}

export default ChangePassword;