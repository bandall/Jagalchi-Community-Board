import Navbar from "../navbar/Navbar1";
import Backimg from "../Waveback/Waveback"
import { Card, Button, Form } from "react-bootstrap";
import s from "./EditorForm.module.css";
import React, { Component, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditorForm = () => {
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    let text = "";
    
    const onEdit = async (content, delta, source, editor) => {
        text = await editor.getHTML();
        //console.log(text);
        //setValue(newValue);
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
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "align",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "background",
        "color",
        "link",
        "image",
        "video",
        "width",
      ];
      
      const modules = {
        toolbar: {
          container: toolbarOptions,
        },
      };
      
      
    return (
        <div>
            <Navbar />
            <Backimg />
            <div className={s.wrap_inner}>
                <Form.Control type="title" placeholder="제목" value={title} onChange={onChange}/>
                <Card className={s.card_stlye} >
                <ReactQuill 
                    style={{height: "300px"}}
                    theme="snow" 
                    modules={modules} 
                    formats={formats} 
                    value={value || ""} 
                    onChange={onEdit}
                />
                </Card>
                <Button variant="primary" onClick={onClick}>
                        제출
                </Button>{' '}
            </div>
        </div>
    );
  };

export default EditorForm;