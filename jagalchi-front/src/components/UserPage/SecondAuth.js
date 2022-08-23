import { Card } from "react-bootstrap";
import CustomNavbar from "../Navbar/CustomNavbar";
import BackImg from "../BackImage/Waveback";
import s from "./SecondAuth.module.css";

function SecondAuth(params) {
    
    const onClick = () => {
        alert("재전송");
    }

    return (
        <div>
            <CustomNavbar/>
            <BackImg/>
            <Card className={s.wrap_card}>
                <Card.Header className={s.card_title}>이메일 인증하기</Card.Header>
                <div className={s.card_text_wrap}>
                    <Card.Text className={s.card_text}>임시 비밀번호를 등록하신 이메일로 발송하였습니다.</Card.Text>
                    <Card.Text className={s.card_text}>로그인 후 임시비밀번호를 변경하여 주십시오.</Card.Text>
                    <Card.Text className={s.card_text}>인증메일을 재전송하기 위해서는 <em className={s.resend_txt} onClick={onClick}>여기</em>를 클릭해 재전송할 수 있습니다.</Card.Text>
                </div>
                <a href="/login" className={s.login_link}>로그인하러 가기 {String.fromCharCode(8594)}</a>
            </Card>
        </div>
    )
}

export default SecondAuth;