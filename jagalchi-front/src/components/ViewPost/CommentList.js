import { useState } from "react";
import Comment from "./Comment";
import s from "./Comment.module.css"
import CommentWriter from "./CommentWriter";
import NestedComment from "./NestedComment";
function CommentList({postID, comments, setComments}) {
    const [commentFocus , setCommnetFocus] = useState("");

    return (
        <div className={s.view_comment}>
            <div className={s.comment_wrap}>
                <div className={s.comment_count}>
                    전체 댓글 
                    <em style={{"color":"red"}}>{" " + comments.length} </em>
                    개
                </div>
                <div className={s.comment_box}>
                    {!comments ? null :
                        <ul className={s.comment_list}>
                            {comments.map((comment) => {
                                if(!comment.parentComment) {
                                    return (
                                        <Comment 
                                            key={comment._id} 
                                            data={comment} 
                                            setComments={setComments}
                                            comments={comments}
                                            focus={commentFocus === comment._id}
                                            setCommnetFocus={setCommnetFocus}
                                            postID={postID} 
                                        />
                                    )
                                } else {
                                    return (
                                        <NestedComment 
                                            key={comment._id} 
                                            data={comment} 
                                            setComments={setComments}
                                            comments={comments}
                                            postID={postID} 
                                        />
                                    )
                                }
                                
                            })}
                            <li className={s.warning_li}>
                                타인을 향한 비방이나 욕설은 제재 대상이 될 수 있습니다.
                            </li>
                        </ul>
                    }
                </div>
            </div>
            <div>
                <CommentWriter 
                    postID={postID} 
                    setComments={setComments} 
                    comments={comments}
                    description={"댓글달기"}
                />
            </div>
        </div>
    )
}

export default CommentList;