import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./components/navbar/Navbar1";
import coverImg from "./assets/bg-coworking.jpeg";
function Home() {
    const [loggedIn, setLoggedin] = useState(false);
    
    useEffect(()=> {
        if(sessionStorage.getItem("loggedIn") === "true"){
            setLoggedin(true);
        }
    }, []);
    return(
        <div style={{backgroundImage: `url(${coverImg})`, backgroundSize: "cover", height: "100vh", width: "100vw"}}>
            <Navbar />
            {/* <Link to={`/login`}>Login</Link>
            <br/>
            <Link to={`/join`}>Create Account</Link>
            <br/>
            <Link to={`/logout`}>Logout</Link>
            {loggedIn === null ? null : (<p>{sessionStorage.getItem("username")}</p>)} */}

        </div>
    )
}

export default Home;