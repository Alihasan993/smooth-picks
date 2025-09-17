import { useContext, useEffect } from "react";
import Product from "../../../Components/website/Product/Product";
import axios from "axios";
import { baseURL, TopRatedApi } from "../../../Api/Api";
import { Container } from "react-bootstrap";
import  { requstData } from "../../../context/RequstContext";
export default function TopRating(){
    //context data for top rating
    const reqData= useContext(requstData);
    useEffect(()=>{
        if(reqData.topRating.length===0)
        try{
            axios.get(`${baseURL}/${TopRatedApi}`)
            .then((data)=>reqData.setTopRating(data.data));
        }
        catch(err){
          console.log(err);
        }
    },[]);
    //Mapping
    const productShow=reqData.topRating.map((pro)=>
    <Product title={pro.title} id={pro.id}
     img={pro.images.length>0?pro.images[0].image:""}
     description={pro.description}
      discount={pro.discount} price={pro.price}
      rating={pro.rating}/>
    )
    return(
        reqData.topRating.length>0&&
        <div className="d-flex align-items-start justify-content-center mb-4 w-100" 
        style={{flexDirection:'column'}}>
            <Container>
            <h3 style={{marginBottom:'25px'}}>Top Rating</h3>
            <div className=" d-flex align-items-center justify-content-center flex-wrap w-100" 
            style={{gap:'3%'}}>
                {productShow}
            </div>
            </Container>
        </div>
    )
}