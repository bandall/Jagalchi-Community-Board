import { useEffect, useState } from "react";
import { Card, Table, Tabs, Tab, Button } from "react-bootstrap"
import Paginationbar from "./Paginationbar";
import TableWritings from "./TableWritng";
import s from "./TableMain.module.css";
import writing from "./TableWritng";

function TableMain() {
    const [writings, setWritings] = useState({});
    const [key, setKey] = useState('all');

    useEffect(() => {
        // if(key === "all")
        //     console.log("Send all request");
        // if(key === "hot")
        //     console.log("Send hot request");
    }, [key])

    const date = new Date().toISOString().substring(0, 10);
    
    const fakeData = [
        { index : 1, title: "Fake Data", author: "Bandall", date: date, view: 100, recommand: 20, link: "www.naver.com" },
        { index : 2, title: "Fake Data2", author: "Bandall77", date: date, view: 200, recommand: 30, link: "www.naver.com" },
        { index : 3, title: "Fake Data2", author: "Bandall77", date: date, view: 200, recommand: 30, link: "www.naver.com" }
    ];
    
    return (
        <div className={s.wrap_inner}>
            <a href="/" className={s.table_header}>
                <h2>자갈치 갤러리</h2>
            </a>
            <Tabs
                activeKey={key}
                onSelect={(k) => setKey(k)}
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="all" title="최신순" />
                <Tab eventKey="hot" title="인기순" />
            </Tabs>
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
                    {fakeData.map((data) => {
                        return (
                            <TableWritings 
                                key={data.index}
                                index={data.index}
                                title={data.title}
                                author={data.author}
                                date={data.date}
                                view={data.view}
                                recommand={data.recommand}
                                link={data.link}
                                style={{"border-collapse":"inherit"}}
                            />
                        )
                    })}
                </tbody>
                </Table>
                <div className={s.search_bar}>
                    <div>
                        <input placeholder="검색" name="search"></input>
                        <Button variant="primary">
                            <a href="/search" style={{color: "white", textDecoration: "none"}}>검색</a>
                        </Button>{' '}
                    </div>
                    <div>
                        <Button variant="primary">
                            <a href="/writeboard" style={{color: "white", textDecoration: "none"}}>글쓰기</a>
                        </Button>{' '}
                    </div>
                </div>
                <div className={s.paginationbar}>
                    <Paginationbar />
                </div>
            </Card>
        </div>
    )
}

export default TableMain;