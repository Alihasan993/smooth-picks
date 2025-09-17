import { useContext, useEffect} from "react";
import Product from "../../../Components/website/Product/Product";
import axios from "axios";
import { baseURL, Latest } from "../../../Api/Api";
import { Container } from "react-bootstrap";
import { requstData } from "../../../context/RequstContext";
export default function LatestProducts(){
    // context data for latest products
    const reqData=useContext(requstData);
    useEffect(()=>{
        if(reqData.latestProducts.length===0)
        try{
            axios.get(`${baseURL}/${Latest}`)
            .then((data)=>
                reqData.setLatestProducts(data.data));
        }
        catch(err){
          console.log(err);
        }
    },[]);
    //Mapping
    const productShow=reqData.latestProducts.map((pro)=>
    <Product title={pro.title} id={pro.id}
     img={pro.images.length>0?pro.images[0].image:""}
     description={pro.description}
      discount={pro.discount} price={pro.price}
      rating={pro.rating}/>
    )
    return(
        reqData.latestProducts.length>0&&
        <div className="d-flex align-items-start justify-content-center mb-4 w-100" 
        style={{flexDirection:'column'}}>
            <Container>
            <h3 style={{marginBottom:'25px'}}>Latest Products</h3>
            <div className=" d-flex align-items-center justify-content-center flex-wrap w-100" 
            style={{gap:'3%'}}>
                {productShow}
            </div>
            </Container>
        </div>
    )
}