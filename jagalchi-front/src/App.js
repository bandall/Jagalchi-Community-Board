import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home/Home.js";
import Login from "./components/login/Login.js";
import Join from "./components/Join/Join.js";
import ViewPost from "./components/ViewPost/ViewPost"
import Logout from './components/Logout/Logout';
import EditPost from "./components/TextEditor/EditPost";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditorForm from './components/TextEditor/EditorForm.js';
import { useEffect, useState } from 'react';
import { getUserInfo } from './components/functions/loginCheck.js';
function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const isLoggedIn = async () => {
        const userData = await getUserInfo();
        if(userData === null) {
            setLoggedIn(false);
            sessionStorage.setItem("loggedIn", "false");
        }
        if(userData.data.loggedIn) {
            setLoggedIn(true);
            sessionStorage.setItem("loggedIn", "true");
        } else {
            setLoggedIn(false);
            sessionStorage.setItem("loggedIn", "false");
        }
    } 

    useEffect(()=> {
        isLoggedIn();
    }, []);

    
  return (
    <Routes>
        <Route path="/" element={<Home loggedIn={loggedIn}/> } />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/search" element={<Home />} />
        <Route path="/post/writeboard" element={<EditorForm />} />
        <Route path="/post/:id" element={<ViewPost/>} />
        <Route path="/post/edit/:id" element={<EditPost/>} />
        <Route path="*" element={<Home loggedIn={loggedIn}/>} />
    </Routes>
  )
}

export default App;
