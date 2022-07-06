import s from "./Waveback.module.css"


function Waveback() {
    return (
        <div className={s.ocean}>
            <div className={s.wave}></div>
            <div className={s.wave}></div>
        </div>
    );
}

export default Waveback;