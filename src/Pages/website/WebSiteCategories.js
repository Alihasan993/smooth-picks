import { useEffect, useState } from "react";
import { baseURL, CAT } from "../../Api/Api";
import axios from "axios";
import { Link } from "react-router-dom";

export default function WebSiteCategories(){
     const[categories,setCategories]=useState([]);
    console.log(categories);
    useEffect(()=>{
         try{
            axios.get(`${baseURL}/${CAT}`)
            
            .then((data)=>setCategories(data.data));
        }
        catch(err){
            console.log(err);
        }
    },[]);
    //mapping
    const dataShow=categories.map((item)=>
    <Link to={`/category/${item.id}`} className="div-link d-flex align-items-center justify-content-start gap-2" >
    <img width={'60px'} height={'60px'} src={item.image} alt="img"/>
    <p>{item.title.length>20?item.title.slice(0,14) + '...':item.title}</p>
    </Link>
    )
    return(<div className="website-cate d-flex align-items-center justify-content-center"
            style={{minHeight:'100vh',backgroundColor:' #f8f9fa'}}>
       <div className="cate-web d-flex align-items-center justify-content-center flex-wrap">
        {dataShow}
       </div>
       </div>
    )
}