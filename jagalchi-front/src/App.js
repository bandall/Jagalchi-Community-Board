import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home/Home.js";
import Login from "./components/login/Login.js";
import Join from "./components/Join/Join.js";
import Logout from './Logout.js';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Logout />} />
    </Routes>
  )
}

export default App;
