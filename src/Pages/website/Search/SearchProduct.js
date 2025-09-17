import { useContext, useEffect } from "react";
import { baseURL, PRO } from "../../../Api/Api";
import axios from "axios";
import { Container } from "react-bootstrap";
import Product from "../../../Components/website/Product/Product";
import { requstData } from "../../../context/RequstContext";
import { WindowSize } from "../../../context/WindowContext";
import { useNavigate } from "react-router-dom";

export default function SearchProduct(){
     //context for resize
     const mobSize=useContext( WindowSize);
     const windowSize =mobSize.windowSize
     //navigate
     const navigate=useNavigate();
     //context data for products & search
     const reqData=useContext(requstData);
     useEffect(()=>{
        if(reqData.products.length===0)
            try{
                axios.get(`${baseURL}/${PRO}`)
                //i am useing then because i am useing try with out (asyn,await)
                .then((data)=> reqData.setProducts(data.data));
            }
            catch(err){
                console.log(err);
            }
        },[]);
    const productsFilter=reqData.search.length>0?
    reqData.products.filter((e)=>e.description.toLowerCase().includes(reqData.search.toLowerCase())):navigate('/',{replace:true});
    
        //mapping
        const proS = productsFilter?.map((pro)=>
          <Product id={pro.id}
               title={pro.title} 
               img={pro.images.length>0?pro.images[0].image:""}
               description={pro.description}
               discount={pro.discount} price={pro.price}
               rating={pro.rating}/>
        )
     return(
      
        <Container>
            <div className=" d-flex align-items-center justify-content-center flex-wrap w-100" 
            style={{gap:'3%',marginTop:windowSize>'767'?'120px':'190px'}}>
               {proS}
            </div>
        </Container>
    )
}
