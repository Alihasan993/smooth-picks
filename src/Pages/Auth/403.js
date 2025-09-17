import { Link } from "react-router-dom";

export default function Err403(prop){
    return(
        <>
              <h3>403</h3>
              <Link to={prop.role==='1999'?'/dashboard':'/'} >{prop.role==='1999'?'go to dashboard':'go to home'}</Link>
        </>
    )
}