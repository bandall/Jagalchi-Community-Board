import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import s from "./Comment.module.css"
import { useEffect, useState } from "react";
import { deleteComment } from "../functions/postAPI";
import NestedCommentWriter from "./NestedCommentWriter";

function Comment({data, comments, setComments, setCommnetFocus, focus, postID}) {
    const [time, setTime] = useState("");

    useEffect(() => {
        const createdTime = new Date(new Date(data.createdAt).getTime() + 60 * 60 * 9);
        const now = new Date();
        let displayTime;
        if(now.getFullYear() === createdTime.getFullYear()) {
            displayTime = (createdTime.getMonth() + 1) + "." + createdTime.getDate() + " ";
        }
        else {
            displayTime = createdTime.getFullYear() + "." + (createdTime.getMonth() + 1) + "." + createdTime.getDate() + " ";
        }
        displayTime = displayTime + createdTime.getHours() + ":" + createdTime.getMinutes();
        setTime(displayTime);
    }, [])

    const onClick = () => {
        if(focus) {
            setCommnetFocus("");
        } else {
            setCommnetFocus(data._id);
        }
    }
    const onDelete = async () => {
        const retJSON = await deleteComment(data._id);
        if(retJSON.status){
            setComments(comments.filter((comment) => String(comment._id) !== String(data._id)));
            alert("댓글을 삭제했습니다.");
        } else {
            alert(retJSON.errMsg);
        }
    }

    return (
        <div>
            <li className={s.comment}>
                <span className={s.cmt_nickbox}>
                    <em className={s.cmt_nickname}>{data.ownerName}</em>
                </span>
                <div style={{"float":"left"}}>
                    <p className={s.cmt_text} onClick={onClick}>{data.commentText}</p>
                </div>
                <div className={s.cmt_fr}>
                    <span className={s.cmt_date}>{time}</span>
                    <FontAwesomeIcon icon={faSquareXmark} style={{color: "red", cursor:"pointer"}} onClick={onDelete}/>
                </div>
            </li>
            {!focus ? null : 
                    <NestedCommentWriter 
                        postID={postID} 
                        parentID={data._id}
                        setComments={setComments} 
                        comments={comments}
                        setCommnetFocus={setCommnetFocus}
                        description={"대댓글 달기"}
                    />
            }
        </div>
    )
}

export default Comment;