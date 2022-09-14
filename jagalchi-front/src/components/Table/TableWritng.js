import s from "./MainTable.module.css";
function TableWritings({index, title, author, authorInfo, date, view, recommand, link, commentNum}) {
    return (
            <tr>
                <td>{index}</td>
                <td className={s.title_text}>
                    <a href={link} className={s.text}>{title}</a>
                    {commentNum === 0 ? null :
                        <a href={link} className={s.text} style={{color:"#FF1E00"}}>{" (+" + commentNum + ")"}</a> 
                    }
                </td>
                <td>
                    <a href={authorInfo} className={s.text}>{author}</a>
                </td>
                <td>{date}</td>
                <td>{view}</td>
                <td>{recommand}</td>
            </tr>
    )
}

export default TableWritings;