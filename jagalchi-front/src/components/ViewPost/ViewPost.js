import Navbar from "../navbar/Navbar1";
import TableMain from "../Table/TableMain";
import Backimg from "../Waveback/Waveback";
function ViewPost() {
    const fakeData = ""
    return(
        <div>
            <Navbar />
            <Backimg />
            <div>
                {fakeData}
            </div>
        </div>
    )
}
{/* <ReactQuill
   value={this.state.content}
   readOnly={true}
   theme={"bubble"}
/> */}
//test
export default ViewPost;