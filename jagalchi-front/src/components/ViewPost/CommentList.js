import { useEffect, useState } from "react";
import Comment from "./Comment";
import s from "./Comment.module.css"
import CommentWriter from "./CommentWriter";
function CommentList({postID, comments, setComments}) {
    return (
        <div className={s.view_comment}>
            <div className={s.comment_wrap}>
                <div className={s.comment_count}>
                    전체 댓글 
                    <em style={{"color":"red"}}>{" " + comments.length} </em>
                    개
                </div>
                <div className={s.comment_box}>
                    { !comments ? null :
                        <ul className={s.comment_list}>
                            {comments.map((comment) => {
                                return (
                                    <Comment 
                                        key={comment._id} 
                                        data={comment} 
                                        setComments={setComments}
                                        comments={comments}
                                    />
                                )
                            })}
                        </ul>
                    }
                </div>
            </div>
            <div>
                <CommentWriter 
                    postID={postID} 
                    setComments={setComments} 
                    comments={comments}
                />
            </div>
        </div>
    )
}

export default CommentList;