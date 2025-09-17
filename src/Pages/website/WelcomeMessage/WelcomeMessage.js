import { NavLink } from "react-router-dom";
import { baseURL,  USER } from "../../../Api/Api";
import Cookie from "cookie-universal"
import axios from "axios";
import { useEffect, useState } from "react";


export default function WelcomeMessage(){

       //cookie
        const cookie = Cookie();
        const token=cookie.get("e-commerce");
        
        //get name for current user
        const [user,setUser]=useState();
        useEffect(()=>{
            if(token){
                axios.get(`${baseURL}/${USER}`,{
                    headers:{
                        Authorization:"Bearer " + token 
                        //useEffect start after end the code
                        //so useEffect can see token ^_^
                    }
                }).then((data)=>setUser(data.data.name))
                .catch((err)=> console.log(err));//if err go to login
            }       
                
            },[]);

    return(
           
        <div className="welcome-message position-absolute"
         style={{width:'400px',textAlign:'center',fontWeight:'bolder',left:'20px',top:'115px'}}>
            {token&&user&&<h2 style={{ color:'white',textShadow: '3px 3px #ff914d'}}>{`Hi ${user}`}</h2>}
            <h4 style={{color:'rgb(5, 5, 112)',marginBottom:'30px'}}>Welcome to our carefully curated collection—premium </h4>
            {/* {!token&&<h4 style={{color:'rgb(5, 5, 112)'}}>
            Discover premium, carefully curated items designed to inspire fun purchases.</h4>} */}
           {!token&& <NavLink className='btn-shop' to='/login'>Shop now</NavLink>}
        </div>
    )
}