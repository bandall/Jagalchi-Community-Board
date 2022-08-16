import { useEffect, useState } from "react";
import { Navigate, useHref, useNavigate, useParams } from "react-router-dom";
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFishFins, faLink, faPersonWalkingDashedLineArrowRight } from "@fortawesome/free-solid-svg-icons";
import 'react-quill/dist/quill.bubble.css'
import Navbar from "../navbar/Navbar1";
import Backimg from "../Waveback/Waveback";
import ReactQuill from "react-quill";
import { deletePost, getPost, postRecommand } from "../functions/postAPI";
import s from "./ViewPost.module.css";
import { Button } from "react-bootstrap";

function ViewPost() {
    const navigate = useNavigate();
    const [modify, setModify] = useState(false);
    const [recommandCnt, setRecomCnt] = useState(0);
    const [recommanded, setRecommand] = useState(false);
    const [postData, setPostData] = useState({});
    const [loaded, setLoaded] = useState(false);
    const { id } = useParams();

    const setData = async () => {
        const json = (await getPost(id)).data;
        const createdTime = new Date(new Date(json.postData.date).getTime() + 60 * 60 * 9);
        json.postData.date = createdTime.toLocaleDateString() + " " + createdTime.toLocaleTimeString();
        //json.postData.date = new Date(json.postData.date).toLocaleString("ko").substring(0, 21);
        setModify(json.modify);
        setRecommand(json.recommanded);
        setPostData(json.postData);
        setRecomCnt(json.postData.recommand);
        setLoaded(true);
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

    const onRecommand = async () => {
        if(sessionStorage.getItem("loggedIn") !== "true") {
            alert("로그인 해주세요.");
            return;
        }
        if(recommanded === true) {
            alert("이미 추천한 게시물입니다.");
            return;
        }
        const result = await postRecommand(id);
        if(!result) {
            alert("추천하지 못 했습니다.");
            return;
        }
        setRecommand(true);
        setRecomCnt(recommandCnt + 1);
    }

    const onDelete = async () => {
        if(!window.confirm("정말 게시글을 삭제하시겠습니까?")) {
			return;
		}
        const result = await deletePost(id);
        console.log(result);
        if(!result) {
            alert("게시글을 삭제하지 못 했습니다.");
            return;
        } 
        if(result.data.code === false) {
            alert(result.data.errMsg);
            return;
        }
        alert("게시글을 삭제했습니다.");
        navigate('/');
    }

    const onEdit = () => {
        navigate('/post/edit/' + id);
    }

    return(
        <div>
            <Navbar />
            <Backimg />
            {!loaded ? null :
            <div className={s.wrap_post}>
                <div className={s.header}>
                    <h1 className={s.post_title}>{postData.title}</h1>
                    <div style={{display: "flex"}}>
                        <p className={s.description_left}>{postData.ownerName} | {postData.date}</p>
                        <p className={s.description_rigth}>조회 : {postData.view} | 추천 : {recommandCnt} | 댓글 : {postData.comment ? postData.comment.length : 0}</p>
                    </div>
                </div>
                <hr/>
                <div className={s.post_text}>
                    <ReactQuill
                        value={postData.textHTML || ""}
                        readOnly={true}
                        theme={"bubble"}
                        style={s.editor}
                    />
                </div>
                <br/>
                <div className={s.recommand_box}>
                    <div style={{display:"flex"}}>
                        <div className={s.icon}><FontAwesomeIcon icon={faFishFins} size="4x" onClick={onRecommand}/></div>
                        <div className={s.icon}><FontAwesomeIcon icon={faLink} onClick={copyLink} size="4x"/></div>
                    </div>
                    <div style={{display:"flex"}}>
                        <div className={s.count}>
                            {recommandCnt}
                        </div>
                        <div className={s.count} >
                            링크 복사
                        </div>
                    </div>
                </div>
                {modify ? <div style={{display:"flex"}}>
                    <Button variant="primary" className={s.editBtn} onClick={onEdit} size="lg">
                            수정
                    </Button>{' '}
                    <Button variant="danger" className={s.deleteBtn} onClick={onDelete} size="lg">
                            삭제
                    </Button>{' '}
                </div> : null}
                <hr/>
                <div>
                    Comment
                </div>
            </div>

            }
        </div>
    )
}


export default ViewPost;