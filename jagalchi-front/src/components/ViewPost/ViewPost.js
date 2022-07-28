import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFishFins, faLink } from "@fortawesome/free-solid-svg-icons";
import 'react-quill/dist/quill.bubble.css'
import Navbar from "../navbar/Navbar1";
import Backimg from "../Waveback/Waveback";
import ReactQuill from "react-quill";
import { getPost } from "../functions/postAPI";
import s from "./ViewPost.module.css";

function ViewPost() {
    const [modify, setModify] = useState(false);
    const [recommanded, setRecommand] = useState(false);
    const [postData, setPostData] = useState({});
    const { id } = useParams();

    const setData = async () => {
        const json = (await getPost(id)).data;
        json.postData.date = new Date(json.postData.date).toLocaleString("ko").substring(0, 20);
        setModify(json.modify);
        setRecommand(json.recommand);
        setPostData(json.postData);
    }
    useEffect(() => {
        setData();
    }, [id])

    useEffect(()=> {

    }, [modify, recommanded, postData]);

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
        } catch(error) {
            return;
        }
    }

    const postRecommand = () => {
        if(sessionStorage.getItem("loggedIn") !== "true") {
            alert("로그인 해주세요.");
            return;
        }
        if(recommanded === true) {
            alert("이미 추천한 게시물입니다.");
            return;
        }
    }

    return(
        <div>
            <Navbar />
            <Backimg />
            <div className={s.wrap_post}>
                <div className={s.header}>
                    <h1 className={s.post_title}>{postData.title}</h1>
                    <div style={{display: "flex"}}>
                        <p className={s.description_left}>{postData.ownerName} | {postData.date}</p>
                        <p className={s.description_rigth}>조회 : {postData.view} | 추천 : {postData.recommand} | 댓글 : {postData.comment ? postData.comment.length : 0}</p>
                    </div>
                </div>
                <hr/>
                <div className={s.post_text}>
                    <ReactQuill
                        value={postData.textHTML}
                        readOnly={true}
                        theme={"bubble"}
                        style={s.editor}
                    />
                </div>
                <br/>
                <div className={s.recommand_box}>
                    <div style={{display:"flex"}}>
                        <div className={s.icon}><FontAwesomeIcon icon={faFishFins} size="4x" onClick={postRecommand}/></div>
                        <div className={s.icon}><FontAwesomeIcon icon={faLink} onClick={copyLink} size="4x"/></div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div className={s.count}>
                            {postData.view}
                        </div>
                        <div className={s.count} >
                            링크 복사
                        </div>
                    </div>
                </div>
                <hr/>
                <div>
                    Comment
                </div>
            </div>
        </div>
    )
}


export default ViewPost;