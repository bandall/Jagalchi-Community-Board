import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar1";
import Backimg from "../Waveback/Waveback";
import ReactQuill from "react-quill";
import { getPost } from "../functions/postAPI";
import s from "./ViewPost.module.css";
import 'react-quill/dist/quill.bubble.css'
function ViewPost() {
    const [modify, setModify] = useState(false);
    const [recommanded, setRecommand] = useState(false);
    const [postData, setPostData] = useState({});
    const { id } = useParams();

    const setData = async () => {
        console.log(id);
        const json = (await getPost(id)).data;
        console.log(json);
        setModify(json.modify);
        setRecommand(json.recommand);
        setPostData(json.postData);
    }
    useEffect(() => {
        setData();
    }, [id])

    useEffect(()=> {

    }, [modify, recommanded, postData])
    return(
        <div>
            <Navbar />
            <Backimg />
            <div className={s.wrap_post}>
                <h1>{postData.title}</h1>
                <ReactQuill
                    value={postData.textHTML}
                    readOnly={true}
                    theme={"bubble"}
                    style={s.editor}
                />
                {postData.textHTML}
            </div>
        </div>
    )
}


export default ViewPost;