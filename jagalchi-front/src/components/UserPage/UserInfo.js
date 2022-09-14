import { useState, useEffect } from "react";
import s from "./UserInfo.module.css";
import { Card, Table } from "react-bootstrap";
import TableWritings from "../Table/TableWritng";
import Paginationbar from "../Table/Paginationbar";
import { getAvatarUrl, getUser } from "../functions/userAPI";
import { useParams } from "react-router-dom";
function UserInfo() {
    const [username, setUserName] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [offest, setOffset] = useState(10);
    const [startNum, setStartNum] = useState(0);
    const [maxPage, setMaxPage] = useState(1);
    const [isLoaded, setLoaded] = useState(false);
    const { id } = useParams();

    const setAvatar = async () => {
        const url = await getAvatarUrl(id);
        setAvatarUrl(url);
    }

    const setUserData = async () => {
        const userData = await getUser(id);
        setUserName(userData.username);
        setAvatar();
        setPosts(userData.posts);
        setPage(1);
    }

    useEffect(() => {
        setMaxPage(Math.ceil(posts.length / offest));
        setStartNum(posts.length - (page - 1) * offest);
        setLoaded(true);
    }, [posts, page])

    useEffect(() => {
        setUserData();
    }, []);

    return (
        <div>
            {
                !isLoaded ? null :
                    <div className={s.wrap_userinfo}>
                    <Card className={s.profile_card}>
                        <div className={s.profile_image_box}>
                            <Card.Img variant="top" src={avatarUrl} className={s.profile_image}/>
                        </div>
                        <h1 className={s.profile_username}>{username}</h1>
                        <div className={s.divide_line}/>
                        <div>
                            <h2>{username + "님이 작성한 게시글"}</h2>
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
                                {posts.slice((page - 1) * offest , page  * offest).map((post, index) => {
                                    const curDate = new Date(new Date().toLocaleDateString());
                                    const createDate = new Date(new Date(post.createdAt).toLocaleDateString());
                                    let date;
                                    //같은 날일 경우
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
                                        date = (createDate.getMonth() + 1) + "월 " +  createDate.getDate() + "일";
                                    }
                                    else {
                                        date = createDate.getFullYear() + "년 " + (createDate.getMonth() + 1) + "월 " +  createDate.getDate() + "일";
                                    }
                                    return (
                                        <TableWritings 
                                            key={index}
                                            index={startNum - index}
                                            title={post.title}
                                            author={post.ownerName}
                                            commentNum={0}
                                            date={date}
                                            view={post.views}
                                            recommand={post.recommand}
                                            link={"/post/" + post._id}
                                            style={{"border-collapse":"inherit"}}
                                        />
                                    )
                                })}
                            </tbody>
                            </Table>
                        </div>
                        <div className={s.paginationbar}>
                            <Paginationbar setPage={setPage} maxPage={maxPage} curPage={page}/>
                        </div>
                    </Card>
                </div>
            }
            </div>
    )
}

export default UserInfo;