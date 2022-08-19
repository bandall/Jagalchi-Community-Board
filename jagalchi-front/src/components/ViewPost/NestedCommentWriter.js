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
                ownerName: newCommentData.username,
                parentComment: parentID,
                commentText,
                createdAt: new Date()
            }
            let nested = false;
            for(let i = 0; i < comments.length; i++) {
                if (String(comments[i]._id) === String(parentID)) {
                    console.log("parent found: " + i);
                    nested = true;
                    continue;
                }
                //console.log(String(comments[i].parentComment) + " " +  String(parentID));
                if (nested && String(comments[i].parentComment) !== String(parentID) && String(comments[i].parent) !== null) {
                    comments.splice(i, 0, newComment);
                    setComments(comments);
                    break;
                }
            }
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