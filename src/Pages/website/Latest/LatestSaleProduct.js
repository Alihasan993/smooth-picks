import { useContext, useEffect } from "react";
import Product from "../../../Components/website/Product/Product";
import axios from "axios";
import { baseURL, LatestSALE } from "../../../Api/Api";
import { Container } from "react-bootstrap";
import { requstData } from "../../../context/RequstContext";
export default function LatestSaleProduct(){
    // context data for latestSale
    const reqData=useContext(requstData);
    useEffect(()=>{
        if(reqData.latestSale.length===0)
        try{
            axios.get(`${baseURL}/${LatestSALE}`)
            .then((data)=> reqData.setlatestSale(data.data));
        }
        catch(err){
          console.log(err);
        }
    },[]);
    //Mapping
    const productShow=reqData.latestSale.map((pro)=>
    <Product title={pro.title} id={pro.id} 
     img={pro.images.length>0?pro.images[0].image:""}
     description={pro.description}
      discount={pro.discount} price={pro.price}
      rating={pro.rating}/>
    )
    return(
        reqData.latestSale.length>0&&
         <div className="d-flex align-items-start justify-content-center mb-4 w-100" 
               style={{flexDirection:'column',    marginTop: '-200px'}}>
                   <Container>
                   <h3 style={{marginBottom:'25px',textShadow: '2px 2px white'}}>Latest Sale Products</h3>
                   <div className=" d-flex align-items-center justify-content-center flex-wrap w-100" 
                   style={{gap:'3%'}}>
                       {productShow}
                   </div>
                   </Container>
               </div>
    )
}