import Navbar from "../navbar/Navbar1";
import Backimg from "../Waveback/Waveback"
import { Card, Button, Form } from "react-bootstrap";
import { SERVER_URL } from "../../gobal";
import s from "./EditorForm.module.css";
import React, { Component, useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from "quill-image-resize-module-react";
import 'react-quill/dist/quill.snow.css';
import axios from "axios";

const EditorForm = () => {
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const quillRef = useRef();
    let text = "";
    Quill.register("modules/imageResize", ImageResize);
    const onEdit = async (content, delta, source, editor) => {
        text = await editor.getHTML();
    }

    const onChange = (event) => {
      setTitle(event.target.value);
    }

    const onClick = () => {
        const data = {
          title: title,
          date: new Date(),
          text: text,
        }
        console.log(data);
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
				const IMG_URL = SERVER_URL + "/" +result.data.url;

				const editor = quillRef.current.getEditor();
				const range = editor.getSelection();
				editor.insertEmbed(range.index, "image", IMG_URL);
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
          }
        },
		imageResize: {
			parchment: Quill.import("parchment"),
			modules: ["Resize", "DisplaySize", "Toolbar"],
		  },
      };
      
      
    return (
        <div>
            <Navbar />
            <Backimg />
            <div className={s.wrap_inner}>
                <Form.Control type="title" placeholder="제목" value={title} onChange={onChange}/>
                <ReactQuill 
					ref={quillRef}
					className={s.editor}
                    theme="snow" 
                    modules={modules} 
                    formats={formats} 
                    value={value || ""} 
                    onChange={onEdit}
                />
                <Button variant="primary" onClick={onClick}>
                        제출
                </Button>{' '}
            </div>
        </div>
    );
  };

export default EditorForm;