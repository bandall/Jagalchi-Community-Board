import { Route, Routes } from 'react-router-dom';
import Home from "./Home.js";
import Login from "./Login.js";
import Join from "./Join.js";
import Logout from './Logout.js';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/logout" element={<Logout />} />
    </Routes>
  )
}

export default App;
