import { useEffect, useState } from "react";
import { submitComment } from "../functions/postAPI";
import s from "./CommentWriter.module.css";
function CommentWriter({postID, parentID, comments, setComments}) {
    const [commentText, setText] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("loggedIn") === "true") {
            setLoggedIn(true);
        }
        else {
            setLoggedIn(false);
        }
    }, [])

    const onSubmit = async () => {
        if(!loggedIn) {
            alert("댓글 작성을 위해선 로그인 해주세요.");
            return;
        }
        const newCommentData = await submitComment(postID, commentText, parentID);
        if(newCommentData !== null) {
            const newComment = {
                _id: newCommentData._id,
                ownerName: newCommentData.username,
                commentText,
                createdAt: new Date()
            }
            setComments([...comments, newComment]);
            setText("");
        }
        else {
            alert("댓글을 등록하지 못 했습니다.");
        }
    }

    const textChange = (event) => {
        if(!loggedIn) {
            alert("댓글 작성을 위해선 로그인 해주세요.");
            return;
        }
        setText(event.target.value);
    }
    
    return (
        <div className={s.cmt_write_box}>
            <div className={s.cmt_title}>댓글달기</div>
            <div>
                <div className={s.cmt_write}>
                    <textarea value={commentText} maxLength="400" onChange={textChange}/>
                    <button onClick={onSubmit}>등록</button>
                </div>
            </div>
        </div>
    )
}

export default CommentWriter;