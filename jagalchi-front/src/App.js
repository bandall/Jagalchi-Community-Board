import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from "./components/Home/Home.js";
import Login from "./components/Login/Login.js";
import Join from "./components/Join/Join.js";
import ViewPost from "./components/ViewPost/ViewPost"
import Logout from './components/Logout/Logout';
import EditPost from "./components/TextEditor/EditPost";
import EditorForm from './components/TextEditor/EditorForm.js';
import Backimg from "./components/BackImage/Waveback"
import SearchTable from './components/Table/SearchTable.js';
import UserInfo from './components/UserPage/UserInfo.js';
import EditUser from './components/UserPage/EditUserInfo.js';
import NotFound from './components/Common/NotFound.js';
import Forbidden from './components/Common/Forbidden.js';
import ChangePassword from './components/UserPage/ChangePassword.js';
import FindPassword from './components/UserPage/FindPassword.js';
import SecondAuth from './components/UserPage/SecondAuth.js';
import CustomNavbar from './components/Navbar/CustomNavbar.js';
import { getUserInfo } from './components/functions/loginCheck.js';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            localStorage.setItem("username", userData.data.username);
            localStorage.setItem("userID", userData.data.userID);
        } else {
            setLoggedIn(false);
            localStorage.clear();
        }
    } 
    
    useEffect(()=> {
        isLoggedIn();
    }, []);

    return (
        <div>
            <CustomNavbar loggedIn={loggedIn}/>
            <Backimg/>
            <Routes>
                <Route path="/" element={<Home/> } />
                <Route path="/login" element={<Login setLoggedIn={setLoggedIn}/>} />
                <Route path="/join" element={<Join />} />
                <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn}/>} />
                <Route path="/find-password" element={<FindPassword/>}/>
                <Route path="/search" element={<Home />} />
                <Route path="/email-auth" element={<SecondAuth/>}/>
                <Route path="/user/:id" element={<UserInfo/>} />
                <Route path="/user/edit/:id" element={<EditUser/>} />
                <Route path="/user/change-password/:id" element={<ChangePassword setLoggedIn={setLoggedIn}/>}/>
                <Route path="/post/writeboard" element={<EditorForm />} />
                <Route path="/post/:id" element={<ViewPost/>} />
                <Route path="/post/edit/:id" element={<EditPost/>} />
                <Route path="/post/search" element={<SearchTable/>} />
                <Route path="/404" element={<NotFound/>} />
                <Route path="/403" element={<Forbidden/>} />
                <Route path="*" element={<Home/>} />
            </Routes>
        </div>
    )
}

export default App;
