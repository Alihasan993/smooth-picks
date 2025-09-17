
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { NavLink} from "react-router-dom";
import { Menu } from "../../context/MenuContext";
import { WindowSize } from "../../context/WindowContext";
import { baseURL, LOGIN, USER } from "../../Api/Api";
import { link } from "./NavLink";
import axios from "axios";
import Cookie from "cookie-universal";
export default function SidBar(){
     const menu=useContext(Menu);
     const isOpen=menu.isOpen;

     const mobSize=useContext( WindowSize);
     const windowSize =mobSize.windowSize

     const cookie=Cookie();

      //get current user
      //useState for current user
          const[userData,setUserData]=useState([]);

         useEffect(()=>{
             try{
                 axios.get(`${baseURL}/${USER}`,{
                     headers:{
                         Authorization: 'Bearer ' + cookie.get('e-commerce'),
                     },
                 })
                 //i am useing then because i am useing try with out (asyn,await)
                 .then((res)=>setUserData(res.data));
             }
             
             catch(err){
                 console.log(err);
             }
         },[]);

    return(
      <>
        <div style={{
            position:"fixed",
            left:"0",
            top:"70px",
            width:"100%",
            height:"100vh",
            backgroundColor:"rgba(0,0,0,0.2)",
            display:windowSize< "768" && isOpen?"block":"none",

            }}></div>
        <div className="sid-bar" style={{
            position:windowSize< "768"?"fixed":"sticky",
            left:windowSize< "768" ? (isOpen? 0:"-100%"):"0",
            minWidth:isOpen?"275px":"fit-content",
            transition:'0.3s'
            }}>
            { link.map((link,key)=>
              link.role.includes(userData.role)&&
              <NavLink key={key} to={link.path}  className='d-flex align-items-center gap-2 mb-2 sid-bar-link'>
                <FontAwesomeIcon icon={link.icon} color={'#038edc'} className="sid-bar-icon"/> <span style={{display:isOpen?'block':'none'}}>{link.name}</span>
              </NavLink>
            )}
        </div>
      </>
    )
    
}