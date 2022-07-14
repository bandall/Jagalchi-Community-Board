import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar1";
import Backimg from "../Waveback/Waveback"
import { Alert } from "react-bootstrap";
import TableMain from "../Table/TableMain"

function Home() {
    return(
        <div>
            <Navbar />
            <Backimg />
            <TableMain />
        </div>
    )
}

export default Home;