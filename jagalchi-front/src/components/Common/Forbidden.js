import CustomNavbar from "../Navbar/CustomNavbar"
import BackImg from "../BackImage/Waveback";
import { Card } from "react-bootstrap";
import s from "./NotFound.module.css";
import Soba from "../../assets/NotFoundSoba.jpg";
function Forbidden(params) {
    
    return (
        <div>
            <BackImg/>
            <CustomNavbar/>
            <Card className={s.wrap}>
                <h1 className={s.text}>Error Code: <em style={{"color":"red"}}>403 </em></h1>
                <h1 className={s.text} style={{color:"black"}}>접근 권한이 없습니다.</h1>
                <img src={Soba} className={s.img} alt=" "/>
            </Card>
        </div>
        
    )
}

export default Forbidden;