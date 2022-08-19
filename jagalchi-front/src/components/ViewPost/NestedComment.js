import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import s from "./NestedComment.module.css"
import { useEffect, useState } from "react";
import { deleteComment } from "../functions/postAPI";

function NestedComment({data, comments, setComments}) {
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
                    <p className={s.cmt_text}>» {data.commentText}</p>
                </div>
                <div className={s.cmt_fr}>
                    <span className={s.cmt_date}>{time}</span>
                    <FontAwesomeIcon icon={faSquareXmark} style={{color: "red", cursor:"pointer"}} onClick={onDelete}/>
                </div>
            </li>
        </div>
    )
}

export default NestedComment;