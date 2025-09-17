import {  Outlet, useNavigate} from "react-router-dom";
import Cookie from "cookie-universal"
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, USER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import Err403  from './403';
export default function AuthRequire({allowedRole}){
    const [user,setUser]=useState();
    const [userRole,setUserRole]=useState();
    //Navigate
    const Navigate=useNavigate();
    useEffect(()=>{
        axios.get(`${baseURL}/${USER}`,{
            headers:{
                Authorization:"Bearer " + token 
                //useEffect start after end the code
                //so useEffect can see token ^_^
            }
        }).then((data)=>{
               setUserRole(data.data.role);
               setUser(data.data);         
               })
        .catch(()=> Navigate('/login' , {replace:true}));//if err go to login
           
        
    },[]);

    
    //cookie
    const cookie = Cookie();
    const token=cookie.get("e-commerce");
   return  token?
    (user===""?
    <Loading/>:(
        userRole===undefined?
        <Loading/>:(
    allowedRole.includes(userRole)?
    <Outlet/>:
    <Err403 role={userRole}/>))
     )
    :
    <Navigate to={'/login'} replace={true}/> ;
}

