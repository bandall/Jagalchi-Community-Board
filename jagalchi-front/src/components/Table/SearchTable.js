import { useEffect, useState } from "react";
import { Table, Tabs, Tab, Button } from "react-bootstrap"
import Paginationbar from "./Paginationbar";
import TableWritings from "./TableWritng";
import s from "./MainTable.module.css";
import { getPosts, searchPost } from "../functions/postAPI";
import { useNavigate, useParams } from "react-router-dom";
import qs from "qs";
function SearchTable() {
    const navigate = useNavigate()
    const [key, setKey] = useState('all');
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [startNum, setStartNum] = useState(0);
    const [maxPage, setMaxPage] = useState(1);
    const [loggedIn, setLoggedin] = useState(false);
    const [searchKey, setSearchKey] = useState("");
    
    const query = qs.parse(window.location.search, {ignoreQueryPrefix: true});
    console.log(query);
    
    const onSearch = async () => {
        navigate("/post/search?keyword=" + searchKey);
        console.log(await searchPost(searchKey));
    }
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
                <Tab eventKey="all" title="검색 결과" />
            </Tabs>
            <div className={s.wrap_table}>
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
                    {posts.map((post, index) => {
                        const curDate = new Date().toLocaleString("ko").substring(0, 11);
                        let createDate = new Date(post.createdAt).toLocaleString("kr").substring(0, 11);
                        if(curDate === createDate) {
                            createDate = new Date(post.createdAt).toLocaleString("kr").substring(12, 20);
                        }
                        else if(curDate.substring(0, 4) === createDate.substring(0, 4)) {
                            createDate = new Date(post.createdAt).toLocaleString("kr").substring(6, 11);
                        }
                        return (
                            <TableWritings 
                                key={index}
                                index={startNum - index}
                                title={post.title}
                                author={post.ownerName}
                                commentNum={post.commentNum}
                                date={createDate}
                                view={post.views}
                                recommand={post.recommand}
                                link={"post/" + post._id}
                                style={{"border-collapse":"inherit"}}
                            />
                        )
                    })}
                </tbody>
                </Table>
                <div className={s.bottom_bar}>
                    <div className={s.search_bar}>
                        <input placeholder="검색" name="search" className={s.search_input} onChange={(e)=>setSearchKey(e.target.value)}></input>
                        <Button variant="primary" onClick={onSearch}>
                            검색
                        </Button>{' '}
                    </div>
                    {loggedIn ? 
                    <div className={s.write_btn}>
                        <Button variant="primary">
                            <a href="/post/writeboard" style={{color: "white", textDecoration: "none"}}>글쓰기</a>
                        </Button>{' '}
                    </div>
                    : null
                    }
                </div>
                <div className={s.paginationbar}>
                    <Paginationbar setPage={setPage} maxPage={maxPage} curPage={page}/>
                </div>
            </div>
        </div>
    )
}

export default SearchTable;