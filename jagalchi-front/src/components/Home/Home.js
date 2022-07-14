import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar1";
import Backimg from "../Waveback/Waveback"
import { Alert } from "react-bootstrap";
import TableMain from "../Table/TableMain"

function Home({loggedIn}) {
    // const [loggedIn, setLoggedin] = useState(false);
    
    // useEffect(()=> {
    //     if(sessionStorage.getItem("loggedIn") === "true"){
    //         setLoggedin(true);
    //     }
    // }, []);
    return(
        // <div style={{backgroundImage: `url(${coverImg})`, backgroundSize: "cover", height: "100vh", width: "100vw"}}>
        <div>
            <Navbar loggedIn={loggedIn}/>
            <Backimg />
            <TableMain />
        </div>
    )
}

export default Home;