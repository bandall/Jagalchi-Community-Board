import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editPost, getPost } from "../functions/postAPI";
import ReactQuill, { Quill } from "react-quill";
import { Button, Form } from "react-bootstrap";
import s from "./EditorForm.module.css";
import BlotFormatter from 'quill-blot-formatter';
import axios from "axios";
import { SERVER_URL } from "../../gobal";

function EditPost(params) {
    Quill.register('modules/blotFormatter', BlotFormatter);
    const navigate = useNavigate();
    const [titleValue, setTitleValue] = useState("");
    const [value, setValue] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [tmpAddFileList, setAddFile] = useState([]);
    const { id } = useParams();
    let title = "";
    let text = "";
	let addFileList = [];
	const quillRef = useRef();
	
    const onEdit = async (content, delta, source, editor) => {
        text = await editor.getHTML();
    }

    const onChangeTitle = (event) => {
		title = event.target.value;
        //setTitleValue(event.target.value);
    }

    const setData = async () => {
        const json = (await getPost(id)).data;
        const createdTime = new Date(new Date(json.postData.date).getTime() + 60 * 60 * 9);
        json.postData.date = createdTime.toLocaleDateString() + " " + createdTime.toLocaleTimeString();
        if(json.modify === false) {
            alert("게시글 수정 권한이 없습니다.");
            navigate("/");
        }
        
        json.postData.attachedFile.forEach(file => {
            addFileList.push(file);
        });
        text = json.postData.textHTML;
        title = json.postData.title;
        setAddFile(addFileList);
        setValue(json.postData.textHTML);
        setTitleValue(json.postData.title);
        setLoaded(true);
    }

    useEffect(() => {
        text = value;
        title = titleValue;
        addFileList = tmpAddFileList;
    }, [loaded]);

    useEffect(() => {
        setData();
    }, [id])

    const onSubmit = async () => {
        const data = {
          title: title,
          text: text,
		  fileList: addFileList,
          postID: id
        }
        //edit post 작업 수행
        //서버에서는 파일 목록 확인하고 사라진 파일 삭제
        if(await editPost(id, data)) {
            navigate("/post/" + id);
        }
        else {
            alert("글쓰기 오류 발생");
        }
    }

    const cancelPost = () =>{
		if(window.confirm("글 수정을 취소하시겠습니까?")) {
			navigate("/");
		}
	}

    const imageHandler = () => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();

		input.addEventListener("change", async ()=> {
			const file = input.files[0];
			const formData = new FormData();
			formData.append("img", file);
			
			try {
				const result = await axios.post(SERVER_URL + "/upload/image", formData);
				const IMG_URL = SERVER_URL + "/" + result.data.url;
				addFileList.push(result.data.url);
				const editor = quillRef.current.getEditor();
				const range = editor.getSelection();
				editor.insertEmbed(range.index, "image", IMG_URL);
			} catch (error) {
				console.log(error);
			}
		})
    }

	const videoHandler = () => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "video/*");
		input.click();

		input.addEventListener("change", async () => {
			const file = input.files[0];
			const formData = new FormData();
			formData.append("video", file);
			try {
				const result = await axios.post(SERVER_URL + "/upload/video", formData);
				const VIDEO_URL = SERVER_URL + "/" + result.data.url;
				addFileList.push(result.data.url);
				const editor = quillRef.current.getEditor();
				const range = editor.getSelection();
				editor.insertEmbed(range.index, "video", VIDEO_URL);
			} catch (error) {
				console.log(error);
			}
		})
	}
    
    const toolbarOptions = [
        ["link", "image", "video"],
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
      ]; 
      
      // 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
      const formats = [
        "header","font","size","bold","italic","underline","strike","align","blockquote","list","bullet","indent","background","color","link","image","video","width",
      ];
      
      const modules = {
        toolbar: {
          container: toolbarOptions,
          handlers: {
            image: imageHandler,
			video: videoHandler
          }
        },
        blotFormatter: {}
      };



      return (
        <div>
            {loaded ? 
                <div>
                    <div className={s.wrap_inner}>
                    <Form.Control type="title" defaultValue={titleValue} placeholder="제목" onChange={onChangeTitle}/>
                    <div>
                        <ReactQuill 
                            ref={quillRef}
                            className={s.editor}
                            theme="snow" 
                            modules={modules} 
                            formats={formats} 
                            value={value || ""} 
                            onChange={onEdit}
                        />
                        </div>
                    </div>
                    <div className={s.submit}>
                        <Button variant="secondary" onClick={cancelPost} className={s.cancel} size="lg">
                                취소
                        </Button>{' '}
                        <Button variant="primary" onClick={onSubmit} className={s.submit} size="lg">
                                수정
                        </Button>{' '}
                    </div>
                </div>
                : null
            }
        </div>
    );
}


export default EditPost;