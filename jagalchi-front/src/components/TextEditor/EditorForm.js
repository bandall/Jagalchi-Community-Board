import { Button, Form } from "react-bootstrap";
import { SERVER_URL } from "../../gobal";
import s from "./EditorForm.module.css";
import React, { useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
//import ImageResize from "quill-image-resize-module-react";
import BlotFormatter from 'quill-blot-formatter';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditorForm = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [titleValue, setTitle] = useState("");
    let title = "";
	const addFileList = [];
	const quillRef = useRef();
	//Quill.register("modules/imageResize", ImageResize);
	Quill.register('modules/blotFormatter', BlotFormatter);
	let text = "";
    const onEdit = async (content, delta, source, editor) => {
        text = await editor.getHTML();
    }

    const onChange = (event) => {
		title = event.target.value;
    }

    const onSubmit = async () => {
        const data = {
          title: title,
          text: text,
		  fileList: addFileList
        }
		if(title === "" || text === "") {
			return alert("제목 또는 본문을 작성해주십시오.");
		}
		try {
			axios.defaults.withCredentials = true;
			const url = SERVER_URL + "/post/writeboard";
        	const retJSON = await axios.post(url, data);
			if(retJSON.data.status) {
				navigate("/post/" + retJSON.data.postID);
			} else {
				alert(retJSON.data.errMsg);
			}
		} catch (error) {
			console.log(error);
			alert("게시글 등록 중 오류가 발생했습니다.");
		}
    }
	
	const cancelPost = () =>{
		if(window.confirm("글 작성을 취소하시겠습니까?")) {
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
				const IMG_URL = "/" + result.data.url;
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
				const VIDEO_URL = "/" + result.data.url;
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
		// imageResize: {
		// 	parchment: Quill.import("parchment"),
		// 	modules: ["Resize", "DisplaySize", "Toolbar"],
		//   },
		blotFormatter: {}
		  
      };
      
      
    return (
        <div>
            <div className={s.wrap_inner}>
                <Form.Control type="title" placeholder="제목" onChange={onChange}/>
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
                        제출
                </Button>{' '}
			</div>
        </div>
    );
  };

export default EditorForm;