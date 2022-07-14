import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home/Home.js";
import Login from "./components/login/Login.js";
import Join from "./components/Join/Join.js";
import ViewPost from "./components/ViewPost/ViewPost"
import Logout from './Logout.js';
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
        }
        if(userData.data.loggedIn) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    } 

    useEffect(()=> {
        isLoggedIn();
    }, []);
    
  return (
    <Routes>
        <Route path="/" element={<Home loggedIn={loggedIn}/> } />
        <Route path="/login" element={<Login loggedIn={loggedIn}/>} />
        <Route path="/join" element={<Join />} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/search" element={<Home />} />
        <Route path="/writeboard" element={<EditorForm />} />
        <Route path="/board/:id" element={<ViewPost/>} />
        <Route path="*" element={<Home />} />
    </Routes>
  )
}

export default App;
