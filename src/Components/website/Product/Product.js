import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';   
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { NavLink} from "react-router-dom";
export default function Product(props){
    const numberStar=Math.round(props.rating);
    const arayStar=[];
    for(let i=0;i<numberStar;i++){
        arayStar.push(<FontAwesomeIcon icon={solidStar} color='gold' />)
    }
    for(let i=0;i<5 - numberStar;i++){
        arayStar.push(<FontAwesomeIcon icon={regularStar}  />)
    }
   return(
    <NavLink to={`/product/${props.id}`} className='pro-parent d-flex mb-4 p-2' >
        <div className='d-flex d-flex align-items-center justify-content-start gap-3 cursor'
        style={{height:'65px'}}>
        {props.discount>0 &&<p className='bg-primary rounded-circle d-inline-block text-white text-center'
          style={{width:'50px', height:'50px',lineHeight:'50px'}} >Sale
        </p>}
            <h5>{props.title.length>15?props.title.slice(0,14)+'...':props.title}</h5>
        </div>
        <div style={{height:'150px'}}>
            <img src={props.img} width={'100%'} height={'150px'} alt="img"/>
        </div >
        <div style={{borderBottom:'1px solid gray',height:'110px',overflow:'hidden' ,textOverflow:'ellipsis'}}>
            <p  style={{textOverflow:'ellipsis'}}>{props.description.length>120?props.description.slice(0,100)+'...':props.description}</p>
        </div>
        <div className='d-flex align-items-center justify-content-between'>
         <div>
           <div className='d-flex align-items-center justify-content-start gap-3 '>
            {props.discount>0?<>
            <h5 style={{color:'blue'}}>${props.discount}</h5>
            <h6 style={{textDecoration:'line-through'}}>${props.price}</h6></>
            :<h5 style={{color:'blue'}}>${props.price}</h5>}  
           </div>
           <div className=' d-flex align-items-center justify-content-start w-100'>
              {arayStar}
           </div>
         </div>
         {/* <div style={{boxShadow:' 0 0 5px rgba(0, 0, 0, 0.5)',borderRadius:'5px',padding:'3px'}}>
            <img src={require('../../../image/cart-header.png') } alt='img'/>
         </div> */}
        </div>
        
    </NavLink>
   )
}