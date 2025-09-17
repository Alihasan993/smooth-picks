import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function ContentHeader(props){
    return(
        <div className="content-header">
            <div className="d-flex align-items-center justify-content-center gap-2">
                <FontAwesomeIcon icon={props.HeaderInfo.icon} style={{width:'40px',height:'40px'}} color={'white'}/>
                <h1>{props.HeaderInfo.title}</h1>
            </div>
            {props.HeaderInfo.show&&<button className="btn btn-primary m-2"
             onClick={props.HeaderInfo.BtnClick}  >{props.HeaderInfo.BtnName}</button>}
        </div>
    )
}
