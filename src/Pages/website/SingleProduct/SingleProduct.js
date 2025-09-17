import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { baseURL, Pro } from "../../../Api/Api";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';   
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { Cart } from "../../../context/CartContext";
// import stylesheet if you're not already using CSS @import

export default function SingleProduct (){
    const {id}=useParams();
    const [imagesProduct,setImageGallery]=useState([]);
    const [singleProduct,setSingleProduct]=useState({});
    //cart context
    const cart=useContext(Cart);
    //message for add to cart
    const[message,setMessage]=useState(false);
    useEffect(()=>{
        axios.get(`${baseURL}/${Pro}/${id}`)
        .then((data)=>{setSingleProduct(data.data[0]);
            setImageGallery(data.data[0].images.map((img)=>{
            return {original:img.image ,
                  thumbnail:img.image ,
                  originalWidth: 800,   // اختيارية: عرض الصورة في العرض
                  originalHeight: 400,  // اختيارية: ارتفاع الصورة في العرض
                  thumbnailWidth: 120,    // عرض thumbnail
                  thumbnailHeight: 70,
                 };
       }))}).catch((err)=>console.log(err));
       //عملنا ماب على الimages 
       //وقلنا نريد مصفوفة جديدة كل عنصر منها هو اوبجيكت على مبدا المكتبة المستوردة
        },[]);

        //for star rating
     const numberStar=Math.round(singleProduct.rating);
        const arayStar=[];
        for(let i=0;i<numberStar;i++){
            arayStar.push(<FontAwesomeIcon icon={solidStar} color='gold' />)
        }
        for(let i=0;i<5 - numberStar;i++){
            arayStar.push(<FontAwesomeIcon icon={regularStar}  />)
        }

        //handle save for cart
        //JSON.stringify use for transfer to json
        // الخطوات : ناتي بالقديم من اللوكال ونخزنه بمصفوفة ونضيف الجديد ثم نضيف المصفوفة الى اللوكال
        function handleCartSave(){
            var countCart=localStorage.getItem("countTotal") || 0;
            ++countCart;
            localStorage.setItem("countTotal",countCart);
            const getItems=JSON.parse(localStorage.getItem("product")) || [];
            const productExist=getItems.findIndex((pro)=>pro.id==id);
            if(productExist!==-1){
                  if(getItems[productExist].count){
                        getItems[productExist].count+=1;
                  }else{
                        getItems[productExist].count=2;
                  }
            }else{
                  getItems.push(singleProduct);
            }
             localStorage.setItem("product",JSON.stringify(getItems));
             cart.setChangeCart((prov)=>!prov);
             setMessage(true);
             setTimeout(()=>{
                setMessage(false);
             },2000);
        }
        //mapping for show About as more <p>
        const aboutShow=singleProduct.About?.split('__').map((item)=>
        <p style={{margin:'0'}}>{item}</p>);
    return(
        <div className="container product-single d-flex align-items-center justify-content-between gap-3"
        style={{marginTop:'120px',padding:' 20px',flexWrap:'wrap'}}>
           <div className="col-lg-5 col-md-5 col-12" style={{borderRadius:'5px',boxShadow: "0 0 5px rgba(0, 0, 0, 0.5)"}}>
               <ImageGallery items={imagesProduct} sizes={'300'} />
           </div>
         <div className='col-lg-5 col-md-5 col-12' >
        <div className=' d-flex align-items-center justify-content-start gap-3'
        style={{height:'65px'}}>
        {singleProduct.discount>0 &&<p className='bg-primary rounded-circle d-inline-block text-white text-center'
          style={{width:'50px', height:'50px',lineHeight:'50px'}} >Sale
        </p>}
            <h4 style={{color:'red'}}>{singleProduct.title}</h4>
        </div>
        
        <div style={{borderBottom:'1px solid gray'}}>
            <p className="text-black-50" >{singleProduct.description}</p>
        </div>
        <div style={{borderBottom:'1px solid gray'}}>
            <h5>About this item</h5>
            {aboutShow}
        </div>

        <div className='d-flex align-items-center justify-content-between'>
         <div>
           <div className='d-flex align-items-center justify-content-start gap-3 '>
            {singleProduct.discount>0?<>
            <h5 style={{color:'blue'}}>${singleProduct.discount}</h5>
            <h6 style={{textDecoration:'line-through'}}>${singleProduct.price}</h6></>
            :<h5 style={{color:'blue'}}>${singleProduct.price}</h5>}  
           </div>
           <div className=' d-flex align-items-center justify-content-start w-100'>
              {arayStar}
           </div>
         </div>
         {message&&<div className=' d-flex align-items-center justify-content-center'
          style={{boxShadow:'0 0 5px rgba(3, 196, 105, 0.2)',padding:'5px',borderRadius:'10px',color:'#0cb70c'}}>
            <h6>It has been added to the cart</h6>
         </div>}
         <div className="scale" onClick={handleCartSave} style={{boxShadow:' 0 0 5px rgba(0, 0, 0, 0.5)',borderRadius:'5px',padding:'3px'}}>
            <img src={require('../../../image/cart-header.png') } alt='img'/>
         </div>
        </div>

        
    </div>
        </div>
    )
}