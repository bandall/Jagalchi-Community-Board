import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import s from "./Comment.module.css"

function Comment(params) {
    return (
        <li className={s.comment}>
            <span className={s.cmt_nickbox}>
                <em className={s.cmt_nickname}>반달곰</em>
            </span>
            <div style={{"float":"left"}}>
                <p className={s.cmt_text}>
                이 댓글은 2022년 8월 18일에 작성되어 댓글 길이가 길때 CSS가 어떻게 망가지는지 확인하기 위해 작성되었다. 댓글 길이를 400자로 정도로 제한하는게 좋을 것 같다.
                이 댓글은 2022년 8월 18일에 작성되어 댓글 길이가 길때 CSS가 어떻게 망가지는지 확인하기 위해 작성되었다. 댓글 길이를 400자로 정도로 제한하는게 좋을 것 같다.
                </p>
            </div>
            <div className={s.cmt_fr}>
                <span className={s.cmt_date}>8.8 12:00</span>
                <FontAwesomeIcon icon={faSquareXmark} style={{color: "red"}}/>
            </div>
        </li>
    )
}

export default Comment;