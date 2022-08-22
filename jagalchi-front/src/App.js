import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home/Home.js";
import Login from "./components/Login/Login.js";
import Join from "./components/Join/Join.js";
import ViewPost from "./components/ViewPost/ViewPost"
import Logout from './components/Logout/Logout';
import EditPost from "./components/TextEditor/EditPost";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditorForm from './components/TextEditor/EditorForm.js';
import { useEffect, useState } from 'react';
import { getUserInfo } from './components/functions/loginCheck.js';
import SearchTable from './components/Table/SearchTable.js';
import UserInfo from './components/UserPage/UserInfo.js';
import EditUser from './components/UserPage/EditUserInfo.js';
import NotFound from './components/Common/NotFound.js';
import Forbidden from './components/Common/Forbidden.js';
function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const isLoggedIn = async () => {
        const userData = await getUserInfo();
        if(userData === null) {
            setLoggedIn(false);
            localStorage.clear();
        }
        if(userData.data.loggedIn) {
            setLoggedIn(true);
            localStorage.setItem("loggedIn", "true");
        } else {
            setLoggedIn(false);
            localStorage.clear();
        }
    } 
    
    useEffect(()=> {
        isLoggedIn();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Home/> } />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/search" element={<Home />} />
            <Route path="/user/:id" element={<UserInfo/>} />
            <Route path="/user/edit/:id" element={<EditUser/>} />
            <Route path="/post/writeboard" element={<EditorForm />} />
            <Route path="/post/:id" element={<ViewPost/>} />
            <Route path="/post/edit/:id" element={<EditPost/>} />
            <Route path="/post/search" element={<SearchTable/>} />
            <Route path="/404" element={<NotFound/>} />
            <Route path="/403" element={<Forbidden/>} />
            <Route path="*" element={<Home/>} />
        </Routes>
    )
}

export default App;
