import axios from "axios";
import { useEffect } from "react"
import { baseURL, GOOGLE_CALL_BACK } from "../../Api/Api";
import { useLocation } from "react-router-dom";

export default function GoogleCallBack(){
    const location=useLocation();
    console.log(location.search);
    useEffect(()=>{
        async function googleCall(){
            try{
                const res= await axios.get(`${baseURL}/${GOOGLE_CALL_BACK}${location.search}`);
                console.log(res);
            }
            catch(err){
                console.log(err);
            }
        }
        googleCall();
    },[]);
    return(
        <h1>test</h1>
    )
}