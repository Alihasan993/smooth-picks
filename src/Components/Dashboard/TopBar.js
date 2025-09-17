import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../context/MenuContext";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { baseURL, LOGOUT, USER } from "../../Api/Api";
import Cookie from "cookie-universal"
import axios from "axios";
import { Link } from "react-router-dom";

export default function TopBar(){
    const menu=useContext(Menu);

    //cookie
    const cookie = Cookie();
    const token=cookie.get("e-commerce");
    
    //get name for current user
    const [user,setUser]=useState();
    useEffect(()=>{
            axios.get(`${baseURL}/${USER}`,{
                headers:{
                    Authorization:"Bearer " + token 
                    //useEffect start after end the code
                    //so useEffect can see token ^_^
                }
            }).then((data)=>setUser(data.data.name))
            .catch((err)=> console.log(err));//if err go to login
               
            
        },[]);

        //handleLogout
       async function handleLogout (){
        try{
             await axios.get(`${baseURL}/${LOGOUT}`,{
                headers:{
                    Authorization:'Bearer ' + cookie.get('e-commerce'),
                }
            });
            window.location.pathname="/login";
            cookie.removeAll();
        }
        catch(err){
            console.log(err);

        }
        
    }
    return(
        <div className="top-bar d-flex align-items-center justify-content-between">
            <div className="div-logo-list d-flex align-items-center justify-content-between" style={{width:"270px",paddingInlineStart: '15px'}}>
                <Link to='/'><img width={'120px'} src={require('../../image/Logo-admin.png') } alt="logo"/></Link>
                <FontAwesomeIcon icon={faBars} onClick={()=>menu.setIsOpen((prov)=>!prov)} style={{fontSize:"25px",cursor:"pointer"}} />
            </div>
            <DropdownButton id="dropdown-basic-button"  title={user}>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}