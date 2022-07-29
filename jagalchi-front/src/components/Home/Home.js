import Navbar from "../navbar/Navbar1";
import Backimg from "../Waveback/Waveback"
import TableMain from "../Table/TableMain"

function Home({loggedIn}) {
    return(
        <div>
            <Backimg />
            <Navbar loggedIn={loggedIn}/>
            <TableMain />
        </div>
    )
}

export default Home;