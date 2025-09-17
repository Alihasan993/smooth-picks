import { useContext, useEffect } from "react";
import { baseURL, PRO } from "../../../Api/Api";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import Product from "../../../Components/website/Product/Product";
import { requstData } from "../../../context/RequstContext";

export default function SingleCategory(){
    //id
    const {id}=useParams();
    //context data for products
     const reqData=useContext(requstData);

     useEffect(()=>{
        if(reqData.products.length===0)
            try{
                axios.get(`${baseURL}/${PRO}`)
                //i am useing then because i am useing try with out (asyn,await)
                .then((data)=>{
                    // setCateProducts(data.data.filter((item)=>{return item.category==id}))
                    reqData.setProducts(data.data);
                }
                );
            }
            catch(err){
                console.log(err);
            }
        },[id]);
        const productsFilter=reqData.products.filter((item)=>{return item.category==id});

        //mapping
        const proS = productsFilter.map((pro)=>
          <Product id={pro.id}
               title={pro.title} 
               img={pro.images.length>0?pro.images[0].image:""}
               description={pro.description}
               discount={pro.discount} price={pro.price}
               rating={pro.rating}/>
        )
     return(
      
        <Container>
            <div className="cate-single d-flex align-items-center justify-content-center flex-wrap w-100" 
            style={{gap:'3%',marginTop:'120px'}}>
               {proS}
            </div>
        </Container>
    )
}
