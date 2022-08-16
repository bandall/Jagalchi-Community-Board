import Navbar from "../Navbar/CustomNavbar";
import Backimg from "../BackImage/Waveback"
import MainTable from "../Table/MainTable"

function Home({loggedIn}) {
    return(
        <div>
            <Backimg />
            <Navbar loggedIn={loggedIn}/>
            <MainTable />
        </div>
    )
}

export default Home;