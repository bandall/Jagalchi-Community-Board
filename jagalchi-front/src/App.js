import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home/Home.js";
import Login from "./components/login/Login.js";
import Join from "./components/Join/Join.js";
import ViewPost from "./components/ViewPost/ViewPost"
import Logout from './Logout.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditorForm from './components/TextEditor/EditorForm.js';
function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/search" element={<Home />} />
        <Route path="/writeboard" element={<EditorForm />} />
        <Route path="/board/:id" element={<ViewPost/>} />
        <Route path="*" element={<Logout />} />
    </Routes>
  )
}

export default App;
