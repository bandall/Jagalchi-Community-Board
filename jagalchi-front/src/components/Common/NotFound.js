import { Card } from "react-bootstrap";
import s from "./NotFound.module.css";
import Soba from "../../assets/NotFoundSoba.jpg";
function NotFound(params) {
    
    return (
        <div>
            <Card className={s.wrap}>
                <h1 className={s.text}>Error Code: <em style={{"color":"red"}}>404 </em></h1>
                <h1 className={s.text} style={{color:"black"}}>페이지를 찾을 수 없습니다.</h1>
                <img src={Soba} className={s.img} alt=" "/>
            </Card>
        </div>
        
    )
}

export default NotFound;