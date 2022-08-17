import Navbar from "../Navbar/CustomNavbar";
import Backimg from "../BackImage/Waveback"
import MainTable from "../Table/MainTable"

function Home() {
    return(
        <div>
            <Backimg />
            <Navbar/>
            <MainTable />
        </div>
    )
}

export default Home;