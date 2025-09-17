import axios from "axios"
import { baseURL, LOGOUT } from "../../Api/Api"
import Cookie from "cookie-universal";
export default function Logout(){
    //cookies
    const cookie=Cookie();
    
    async function handleLogout (){
        try{
             await axios.get(`${baseURL}/${LOGOUT}`,{
                headers:{
                    Authorization:'Bearer ' + cookie.get('e-commerce'),
                }
            });
            window.location.pathname="/login";
        }
        catch(err){
            console.log(err);

        }
        
    }
    return(
        <button onClick={handleLogout}>Logout</button>
    )
}