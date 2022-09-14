import { useEffect, useState } from "react";
import { Table, Tabs, Tab, Button } from "react-bootstrap"
import Paginationbar from "./Paginationbar";
import TableWritings from "./TableWritng";
import s from "./MainTable.module.css";
import { searchPost } from "../functions/postAPI";
import { useNavigate } from "react-router-dom";
import qs from "qs";
function SearchTable() {
    const navigate = useNavigate()
    const [key, setKey] = useState('search');
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [startNum, setStartNum] = useState(0);
    const [maxPage, setMaxPage] = useState(1);
    const [loggedIn, setLoggedin] = useState(false);
    const [searchKey, setSearchKey] = useState("");
    
    useEffect(() => {
        if(localStorage.getItem("loggedIn") === "true"){
            setLoggedin(true);
        }
        else {
            setLoggedin(false);
        }
        
    }, []);

    useEffect(() => {
        getSearchPost();
    }, [key, page])

    const getSearchPost = async () => {
        const query = qs.parse(window.location.search, {ignoreQueryPrefix: true});
        const json = await searchPost(query.keyword, page);
        if(!json) return;
        setPosts(json.data.posts);
        setMaxPage(json.data.maxPage);
        setStartNum(json.data.startNum);
    }

    const onSearch = async () => {
        if(searchKey === "") {
            alert("검색어를 입력해주세요.");
            return;
        }
        navigate("/post/search?keyword=" + searchKey);
        window.location.reload();
    }
    return (
        <div>
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
                    <Tab eventKey="search" title="검색 결과" />
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
                            const curDate = new Date(new Date().toLocaleDateString());
                            const createDate = new Date(new Date(post.createdAt).toLocaleDateString());
                            let date;
                            if(curDate.getTime() === createDate.getTime()) {
                                const createTime = new Date(new Date(post.createdAt).getTime() + 60 * 60 * 9);
                                if(createTime.getHours() < 12) {
                                    date = "오전 " + createTime.getHours() + "시 " + createTime.getMinutes() + "분";
                                }
                                else if(createTime.getHours() === 12) {
                                    date = "오후 " + createTime.getHours() + "시 " + createTime.getMinutes() + "분";
                                }
                                else {
                                    date = "오후 " + (createTime.getHours() - 12) + "시 " + createTime.getMinutes() + "분";
                                }
                            }
                            else if(curDate.getFullYear() === createDate.getFullYear()) {
                                date = createDate.getMonth() + "월 " +  createDate.getDate() + "일";
                            }
                            else {
                                date = createDate.getFullYear() + "년 " + createDate.getMonth() + "월 " +  createDate.getDate() + "일";
                            }
                            return (
                                <TableWritings 
                                    key={index}
                                    index={startNum - index}
                                    title={post.title}
                                    author={post.ownerName}
                                    commentNum={post.comments.length}
                                    date={date}
                                    view={post.views}
                                    recommand={post.recommand}
                                    link={post._id}
                                    style={{"border-collapse":"inherit"}}
                                />
                            )
                        })}
                    </tbody>
                    </Table>
                    <div className={s.bottom_bar}>
                        <div className={s.search_bar}>
                            <input placeholder="제목+내용 검색" name="search" className={s.search_input} onChange={(e)=>setSearchKey(e.target.value)}></input>
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
        </div>
    )
}

export default SearchTable;