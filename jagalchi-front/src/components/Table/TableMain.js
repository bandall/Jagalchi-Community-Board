import { Card, Table } from "react-bootstrap"
import s from "./TableMain.module.css";
function TableMain() {
    return (
        <div className={s.wrap_inner}>
            <a href="/" className={s.table_header}>
                <h2>자갈치 갤러리</h2>
            </a>
            <Card>
                <Table hover className={s.table}>
                <thead>
                    <tr>
                        <th className={s.table_number}>번호</th>
                        <th className={s.table_title}>제목</th>
                        <th className={s.table_author}>글쓴이</th>
                        <th className={s.table_date}>작성일</th>
                        <th className={s.table_view}>조회</th>
                        <th className={s.table_suggest}>추천</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td className={s.title_text}>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td>10</td>
                        <td>1</td>
                    </tr>
                </tbody>
                </Table>
            </Card>
        </div>
    )
}

export default TableMain;