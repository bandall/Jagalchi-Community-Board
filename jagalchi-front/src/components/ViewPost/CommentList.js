import Comment from "./Comment";
import s from "./Comment.module.css"
import CommentWriter from "./CommentWriter";
function CommentList(params) {
    return (
        <div className={s.view_comment}>
            <div className={s.comment_wrap}>
                <div className={s.comment_count}>
                    전체 댓글 
                    <em style={{"color":"red"}}>10 </em>
                    개
                </div>
                <div className={s.comment_box}>
                    <ul className={s.comment_list}>
                        {params.comment.map((comment, index) => {
                            return (
                               <Comment/>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div>
                <CommentWriter/>
            </div>
        </div>
    )
}

export default CommentList;