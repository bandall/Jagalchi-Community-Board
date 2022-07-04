import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Home() {
    const [loggedIn, setLoggedin] = useState(false);
    
    useEffect(()=> {
        if(sessionStorage.getItem("loggedIn") === "true"){
            setLoggedin(true);
        }
    }, []);
    return(
        <div>
            <h1>Home Page</h1>
            <Link to={`/login`}>Login</Link>
            <br/>
            <Link to={`/join`}>Create Account</Link>
            <br/>
            <Link to={`/logout`}>Logout</Link>
            {loggedIn === null ? null : (<p>{sessionStorage.getItem("username")}</p>)}
        </div>
    )
}

export default Home;