import { Outlet } from "react-router-dom";
import SidBar from "../../Components/Dashboard/SidBar";
import TopBar from "../../Components/Dashboard/TopBar";

export default function Dashboard (){
    return(
        <div className="position-relative dashboard">
            <TopBar/>
            <div className="d-flex gap-1" style={{marginTop:"70px"}}>
             <SidBar/>
             <Outlet/>
            </div>
        </div>
    )
}