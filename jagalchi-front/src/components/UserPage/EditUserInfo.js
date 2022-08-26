import { Card, Button, Form, Col, Row } from "react-bootstrap";
import CustomNavbar from "../Navbar/CustomNavbar";
import s from "./EditUser.module.css";
import BackImg from "../BackImage/Waveback";
import { useEffect, useState } from "react";
import { getAvatarUrl, getEditUser, postEditUser } from "../functions/userAPI";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../../gobal";

function EditUser(params) {
    const [avatarUrl, setAvatarUrl] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [phonenum, setPhonenum] = useState("");
    const [password, setPassword] = useState("");
    const { id } = useParams();

    const setUserInfo = async () => {
        const url = await getAvatarUrl(id);
        setAvatarUrl(url);
        const ret = await getEditUser();
        if(!ret) return;
        setUsername(ret.userInfo.username);
        setEmail(ret.userInfo.email);
        setBirthDate(ret.userInfo.birthDate.substr(0, 10));
        setPhonenum(ret.userInfo.phoneNumber);
    }

    const imageHandler = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.addEventListener("change", async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append("avatar", file);

            try {
                await axios.post(SERVER_URL + "/upload/avatar", formData);
                const url = await getAvatarUrl(id);
                setAvatarUrl(url);
            } catch (error) {
                console.log(error);
                alert("프로필 사진을 업로드하지 못 했습니다.");
            }
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const result = await postEditUser(id, username, birthDate, phonenum, password);
        if(result) {
            alert("회원정보 변경에 성공했습니다.");
            localStorage.setItem("username", username);
            window.location.reload();
        }
    }

    useEffect(() => {
        setUserInfo();
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
                    <Button variant="primary" className={s.profile_submit_btn} onClick={imageHandler}>프로필 사진 업로드</Button>
                </Card>
                <Card className={s.wrap_profile_info}>
                    <Card.Header>계정 정보 변경</Card.Header>
                    <Form className={s.profile_info_form}>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="inputUsername">
                            <Form.Label>유저 이름</Form.Label>
                            <Form.Control 
                                type="username" 
                                defaultValue={username} 
                                placeholder="유저 이름을 입력해 주세요." 
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                            </Form.Group>

                            <Form.Group as={Col} controlId="inputEmail">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control
                                type="email"
                                defaultValue={email}
                                placeholder="name@example.com"
                                disabled
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
                                    defaultValue={birthDate}
                                    onChange={e => setBirthDate(e.target.value)}
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
                                    defaultValue={phonenum}
                                    onChange={e => setPhonenum(e.target.value)}
                                    required
                                    pattern="[0-9]{11}"
                                />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formGridPassword">
                            <Form.Label>비밀번호 확인</Form.Label>
                            <Form.Control
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" style={{float:"right"}} onClick={onSubmit}>
                           계정 정보 변경
                        </Button>
                    </Form>
                </Card>
            </div>
        </div>
    )
}

export default EditUser;