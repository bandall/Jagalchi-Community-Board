import { Card, Button, Form, Col, Row } from "react-bootstrap";
import CustomNavbar from "../Navbar/CustomNavbar";
import s from "./EditUser.module.css";
import defaultImg from "../../assets/default_profile.jpg";
import BackImg from "../BackImage/Waveback";
import { useEffect, useState } from "react";
import { getAvatarUrl } from "../functions/userAPI";
import { useParams } from "react-router-dom";

function EditUser(params) {
    const [avatarUrl, setAvatarUrl] = useState("");
    const { id } = useParams();
    const dummyUser = {
        username: "jsm5315",
        email: "jsm5315@gmail.com",
        birthDate: "2000-03-02",
        phoneNumber: "01082950663"
    }

    const setAvatar = async () => {
        const url = await getAvatarUrl(id);
        setAvatarUrl(url);
    }
    useEffect(() => {
        setAvatar();
    }, [])

    return (
        <div>
            <CustomNavbar/>
            <BackImg/>
            <div className={s.wrap_edit_user}>
                <Card className={s.profile_card}>
                    <Card.Header>프로필 사진</Card.Header>
                    <Card.Img variant="top" src={avatarUrl} className={s.profile_image}/>
                    <Card.Text className={s.profile_image_submit_txt}>5MB 이하의 이미지만 업로드 가능합니다.</Card.Text>
                    <Button variant="primary" className={s.profile_submit_btn}>프로필 사진 업로드</Button>
                </Card>
                <Card className={s.wrap_profile_info}>
                    <Card.Header>계정 정보 변경</Card.Header>
                    <Form className={s.profile_info_form}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="inputUsername">
                            <Form.Label>유저 이름</Form.Label>
                            <Form.Control 
                                type="username" 
                                defaultValue={dummyUser.username} 
                                placeholder="유저 이름을 입력해 주세요." 
                                required
                            />
                            </Form.Group>

                            <Form.Group as={Col} controlId="inputEmail">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control
                                type="email"
                                defaultValue={dummyUser.email}
                                placeholder="name@example.com"
                                required
                            />
                            </Form.Group>
                        </Row>
                        
                        <Row className="mb-3">
                            <Form.Group as={Col} className="mb-3" controlId="formGridDate">
                                <Form.Label>생일</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="YYYY-MM-DD"
                                    defaultValue={dummyUser.birthDate}
                                    required
                                    min="1920-01-01"
                                    max="2022-01-01"
                                />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formGridPhoneNumber">
                                <Form.Label>전화번호</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="-없이 입력"
                                    defaultValue={dummyUser.phoneNumber}
                                    required
                                    pattern="[0-9]{11}"
                                />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formGridPassword">
                            <Form.Label>비밀번호 확인</Form.Label>
                            <Form.Control
                                type="password"
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" style={{float:"right"}}>
                           계정 정보 변경
                        </Button>
                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default EditUser;