import { useEffect, useState } from "react";
import { submitComment } from "../functions/postAPI";
import s from "./NestedCommentWriter.module.css";
function NestedCommentWriter({postID, parentID, comments, setComments, description, setCommnetFocus}) {
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
                owner: localStorage.getItem("userID"),
                ownerName: newCommentData.username,
                parentComment: parentID,
                commentText,
                isDeleted: false,
                createdAt: new Date()
            }
            const idx = comments.findIndex((comment) => {
                if(String(comment._id) === String(parentID)) return true;
                else return false;
            })
            let cnt = 0;
            for(let i = idx + 1; i < comments.length; i++) {
                if(String(comments[i].parentComment) !== String(parentID)) {
                    break;
                }
                cnt = cnt + 1;
            }
            comments.splice(idx + cnt + 1, 0, newComment);
            setComments(comments);
            setText("");
            setCommnetFocus("");
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
            <div className={s.cmt_title}>{description}</div>
            <div>
                <div className={s.cmt_write}>
                    <textarea value={commentText} maxLength="400" onChange={textChange}/>
                    <button onClick={onSubmit}>등록</button>
                </div>
            </div>
        </div>
    )
}

export default NestedCommentWriter;