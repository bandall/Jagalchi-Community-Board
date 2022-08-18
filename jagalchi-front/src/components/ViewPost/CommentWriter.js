import s from "./CommentWriter.module.css";
function CommentWriter(params) {
    return (
        <div className={s.cmt_write_box}>
            <div className={s.cmt_title}>댓글달기</div>
            <div>
                <div className={s.cmt_write}>
                    <textarea maxLength="400"/>
                    <button>등록</button>
                </div>
            </div>
        </div>
    )
}

export default CommentWriter;