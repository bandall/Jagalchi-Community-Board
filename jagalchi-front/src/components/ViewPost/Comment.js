import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import s from "./Comment.module.css"
import { useEffect, useState } from "react";
import { deleteComment } from "../functions/postAPI";
import NestedCommentWriter from "./NestedCommentWriter";

function Comment({data, comments, setComments, setCommnetFocus, focus, postID}) {
    const [time, setTime] = useState("");
    const [ownerInfo, setOwnerInfo] = useState("");

    useEffect(() => {
        const createdTime = new Date(new Date(data.createdAt).getTime() + 60 * 60 * 9);
        const now = new Date();
        let displayTime = "";
        if(now.getFullYear() === createdTime.getFullYear()) {
            if((createdTime.getMonth() + 1) < 10) displayTime += ("0" + (createdTime.getMonth() + 1) + ".");
            else displayTime += ((createdTime.getMonth() + 1) + ".");

            if(createdTime.getDate() < 10) displayTime += ("0" + + createdTime.getDate() + " ");
            else displayTime += (createdTime.getDate() + " ");
        }
        else {
            displayTime = createdTime.getFullYear() + ".";
            if((createdTime.getMonth() + 1) < 10) displayTime += ("0" + (createdTime.getMonth() + 1) + ".");
            else displayTime += ((createdTime.getMonth() + 1) + ".");

            if(createdTime.getDate() < 10) displayTime += ("0" + + createdTime.getDate() + " ");
            else displayTime += (createdTime.getDate() + " ");
        }
        if(createdTime.getHours() < 10) displayTime += ("0" + + createdTime.getHours() + ":");
        else displayTime += (createdTime.getHours() + ":");

        if(createdTime.getMinutes() < 10) displayTime += ("0" + + createdTime.getMinutes());
        else displayTime += (createdTime.getMinutes());
        setTime(displayTime);
        setOwnerInfo("/userinfo/" + data.owner);
    }, [])

    const onClick = () => {
        if(focus) {
            setCommnetFocus("");
        } else {
            setCommnetFocus(data._id);
        }
    }
    const onDelete = async () => {
        const result = await deleteComment(data._id);
        if(result){
            const delIdx = comments.findIndex((comment) => String(comment._id) === String(data._id));
            if(delIdx !== -1) {
                comments[delIdx].commentText = "삭제된 게시글입니다.";
                comments[delIdx].isDeleted = true;
            }
            setComments([...comments]);
            alert("댓글을 삭제했습니다.");
        } 
    }

    return (
        <div>
            <li className={s.comment}>
                <span className={s.cmt_nickbox}>
                    <em className={s.cmt_nickname}><a href={ownerInfo}>{data.ownerName}</a></em>
                </span>
                <div style={{"float":"left"}}>
                    <p className={s.cmt_text} onClick={onClick}>{data.commentText}</p>
                </div>
                <div className={s.cmt_fr}>
                    <span className={s.cmt_date}>{time}</span>
                    { localStorage.getItem("userID") === String(data.owner) && !data.isDeleted ? 
                        <FontAwesomeIcon 
                            icon={faSquareXmark} 
                            style={{color: "red", cursor:"pointer"}} 
                            onClick={onDelete}
                        />
                        :
                        null
                    }
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