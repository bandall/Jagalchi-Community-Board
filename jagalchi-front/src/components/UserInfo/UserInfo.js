import { useState, useEffect } from "react";
import s from "./UserInfo.module.css";
import CustomNavbar from "../Navbar/CustomNavbar";
import Backimg from "../BackImage/Waveback"
import { Card, Table } from "react-bootstrap";
import TableWritings from "../Table/TableWritng";
import defaultImg from "../../assets/default_profile.jpg";
function UserInfo() {
    const [userData, setUserData] = useState();
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [startNum, setStartNum] = useState(0);
    const [maxPage, setMaxPage] = useState(1);

    const dummyData = {
        username: "반달가슴곰",
        userImg: defaultImg,
        userPosts: ["62fedb809465a9740b91d78c"]
    }

    const dummyPosts = [
        {
            "_id": "62fedb809465a9740b91d78c",
            "ownerName": "반달곰",
            "title": "대댓글 테스트",
            "views": 87,
            "recommand": 0,
            "comments": [
                "62fef6907ea4f232af5d4a11",
                "62fedf669741a71ce9d3a3a0",
                "62ff2553d380e29f6bad4c96",
                "62ff24dad380e29f6bad4c85",
                "62ff1c9dd380e29f6bad4b6a",
                "62ff1c7bd380e29f6bad4b5f",
                "62fefe72d380e29f6bad4a95",
                "62fefebcd380e29f6bad4aac",
                "62fefe95d380e29f6bad4a9f",
                "62fefeb7d380e29f6bad4aa5"
            ],
            "createdAt": "2022-08-19T00:38:24.756Z"
        },
        {
            "_id": "62faf96e0e55458a0cb53d3e",
            "ownerName": "반달곰",
            "title": "123123",
            "views": 44,
            "recommand": 0,
            "comment": [],
            "createdAt": "2022-08-16T01:57:02.886Z",
            "comments": [
                "62ff1550d380e29f6bad4afb"
            ]
        },
        {
            "comments": [],
            "_id": "62faf7ee1ec6a2182be569d1",
            "ownerName": "반달곰",
            "title": "asdf",
            "views": 22,
            "recommand": 0,
            "comment": [],
            "createdAt": "2022-08-16T01:50:38.031Z"
        },
        {
            "_id": "62faf4cf1ec6a2182be56948",
            "ownerName": "반달곰",
            "title": "1123123123",
            "views": 12,
            "recommand": 0,
            "comment": [],
            "createdAt": "2022-08-16T01:37:19.412Z",
            "comments": []
        },
        {
            "_id": "62e2106f6ca1ee63a4fcefdf",
            "ownerName": "반달곰",
            "title": "시간 테스트 오후 1시28분",
            "views": 81,
            "recommand": 0,
            "comment": [],
            "createdAt": "2022-07-28T04:28:31.117Z",
            "comments": []
        },
        {
            "comments": [],
            "_id": "62e0927613a79660e2c3579d",
            "ownerName": "반달곰",
            "title": "123123",
            "views": 21,
            "recommand": 0,
            "comment": [],
            "createdAt": "2022-07-27T01:18:46.640Z"
        },
        {
            "comments": [],
            "_id": "62e0926d13a79660e2c35795",
            "ownerName": "반달곰",
            "title": "123",
            "views": 11,
            "recommand": 0,
            "comment": [],
            "createdAt": "2022-07-27T01:18:37.610Z"
        },
        {
            "_id": "62d8d440499defc4078b88c3",
            "ownerName": "반달곰",
            "title": "스크롤 테스트",
            "views": 21,
            "recommand": 0,
            "comment": [],
            "createdAt": "2022-07-21T04:21:20.449Z",
            "comments": []
        }
    ]

    useEffect(() => {
        setPosts(dummyPosts);
        setPage(1);
        setMaxPage(1);
        setStartNum(8);
    }, []);

    return (
        <div>
            <Backimg/>
            <CustomNavbar/>
            <div className={s.wrap_userinfo}>
                <Card className={s.profile_card}>
                    {/* <Card.Header>유저 정보</Card.Header> */}
                    <div className={s.profile_image_box}>
                        <Card.Img variant="top" src={dummyData.userImg} className={s.profile_image}/>
                        <h1 className={s.profile_username}>{dummyData.username}</h1>
                    </div>
                    <div className={s.divide_line}/>
                    <div>
                        <h2>{dummyData.username + "님이 작성한 게시글"}</h2>
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
                                        commentNum={post.comments.length}
                                        date={date}
                                        view={post.views}
                                        recommand={post.recommand}
                                        link={"post/" + post._id}
                                        style={{"border-collapse":"inherit"}}
                                    />
                                )
                            })}
                        </tbody>
                        </Table>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default UserInfo;