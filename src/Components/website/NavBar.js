import axios from 'axios';
import { useContext, useEffect, useRef, useState } from 'react'
import { baseURL,LOGOUT, CAT} from '../../Api/Api';
import { Link, NavLink } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { Cart } from '../../context/CartContext';
import { requstData } from '../../context/RequstContext';
import { Dropdown, DropdownButton } from "react-bootstrap";
import Cookie from "cookie-universal"
import { WindowSize } from '../../context/WindowContext';
export default function NavBar(){
    const[categories,setCategories]=useState([]);
    // const[search,setSearch]=useState([]);
    //context for search
    const searchData=useContext(requstData);
    // searchData.setSearch(search);
    //useref for click search
    const btnRef=useRef();
    const divRef=useRef();

    
    //context for window size
    const mobSize=useContext(WindowSize)
    //state cart
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [productsCart,setProductsCart]=useState([]);

    //cart context for update useEffect when buy product
        const cart=useContext(Cart);
        const changeCart=cart.changeCart;
      //cookie
        const cookie = Cookie();
        const token=cookie.get("e-commerce");
    //get cart from localStorage
    useEffect(()=>{
        const getItems=JSON.parse(localStorage.getItem('product')) || [];
        setProductsCart(getItems);
    },[changeCart])
    //get categories
    useEffect(()=>{
        try{
            axios.get(`${baseURL}/${CAT}`)
            
            .then((data)=>setCategories(data.data));
        }
        catch(err){
            console.log(err);
        }
    },[]);
    //handle delete product from cart
    function handleCartDelete(id,count){
        var countTotal=localStorage.getItem("countTotal");
        count?countTotal-=count:countTotal-=1;
         localStorage.setItem('countTotal',countTotal);

        setProductsCart((prev)=>prev.filter((item)=>item.id!==id));
        const getItems=JSON.parse(localStorage.getItem('product')) || [];
        const getItemsFilter=getItems.filter((e)=>{return e.id!==id});
        localStorage.setItem('product',JSON.stringify(getItemsFilter));
    }
    function handleChangeSearch(e){
      searchData.setSearch(e.target.value);
        // focus.current.addEventListener('keydown',(e)=>{
        //   if(e.target==='Enter'){
        //     focusClick.current.focus();
        //   }
        // })
    }
    useEffect(()=>{
      divRef.current.addEventListener('keydown',(e)=>{
            if(e.key==='Enter'){
            btnRef.current.click();
          }
      })
    },[]);
       async function handleLogout (){
        try{
             await axios.get(`${baseURL}/${LOGOUT}`,{
                headers:{
                    Authorization:'Bearer ' + cookie.get('e-commerce'),
                }
            });
            window.location.pathname="/";
            cookie.removeAll();
        }
        catch(err){
            console.log(err);

        }
        
    }
    
    //*******mapping**********
    //mapping categories
    const dataShow=categories.slice(-8).map((item,key)=>
    <NavLink  key={key} to={`/category/${item.id}`} style={{textDecoration:'none'}}>
        <h5>{item.title.length>20?item.title.slice(0,14) + '...':item.title}</h5></NavLink>); 
    //mapping cart
    //put ? if productsCart empty so no Error
    const cartShow=productsCart?.map((item,key)=>
    <div key={key} className='d-flex align-items-start justify-content-between position-relative'
    style={{marginTop:'5px'}}>
          <img src={item.images.length>0?item.images[0].image:""}
           style={{width:'120px',height:'85px'}} alt='img'/>
          <h6>{item.title}</h6>
          <div className='d-flex flex-column align-items-end'>
           <h6>Count: <span style={{color:'red'}}>{item.count?item.count:1}</span></h6>
           {item.discount>0?
              <div className='d-flex align-items-center justify-content-start gap-3' >
                 <h5 style={{color:'blue'}}>${item.discount}</h5>
                 <h6 style={{textDecoration:'line-through',color:'gray'}}>${item.price}</h6>
              </div>
              :<h5 style={{color:'blue'}}>${item.price}</h5>}
              <div className="d-flex justify-content-center align-items-center"
                  onClick={()=>handleCartDelete(item.id,item.count)}
                  style={{borderRadius:'5px',width:'72px',height:'35px',
                  backgroundColor:'red',color:'white',cursor:'pointer'}}>Delete
              </div>
          </div>
    </div>);  
   
    return(
     <div className='nav-bar'>
      {/*######## cart ##########*/}
         <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body className='parent-cart text-center p-2 pb-0'>{cartShow.length===0?"Your cart is empty":cartShow}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

        <div className="div-nav-bar-website d-flex align-items-center justify-content-between" style={{marginInline:'10px'}}>
            <div>
              <NavLink to='/' > <img width={'120px'}  src={require('../../image/Logo.png') } alt="logo"/></NavLink>
            </div>
            {mobSize.windowSize>='768' &&<div>
                <div className="row justify-content-center" ref={divRef}  >
                      <div className="input-group" >
                        <input className="form-control form-control-lg" type="search"
                         value={searchData.search}  onChange={handleChangeSearch} placeholder="Search" aria-label="Search" />
                        <NavLink to={searchData.search.length>0?'/search':'/'} ref={btnRef} tabIndex={2}  className="btn btn-primary px-4 "
                        style={{fontWeight: 'bolder',lineHeight:'40px'}}>
                          Search
                        </NavLink>
                      </div>
                </div>
             </div>}
            <div className='div-nav-bar-info d-flex align-items-center justify-content-between gap-3'>
               <div className='scale position-relative' onClick={handleShow}>
                 {localStorage.getItem("countTotal") >0&&<span className='cart-notifications position-absolute'>{localStorage.getItem("countTotal") }</span>}
                 <img src={require('../../image/cart-header.png') } alt="cart"/></div>
                 <DropdownButton style={{backgroundColor:'transparent'}} title={
              <img src={require('../../image/User-header.png') } alt="Profile" style={{ width: 40, height: 40, borderRadius: '50%' }} />}>
            {token?<Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            :<><Dropdown.Item ><Link to='/login' className='d-block'>Login</Link></Dropdown.Item>
               <Dropdown.Item ><Link to='/register' className='d-block'>Register</Link></Dropdown.Item></>}

            </DropdownButton>
                
            </div>
        </div>
         
         {mobSize.windowSize<'768' &&<div>
                <div className="row justify-content-center" >
                      <div className="input-group" style={{width:'98%'}}  >
                        <input className="form-control form-control-lg " type="search"
                         value={searchData.search}  onChange={handleChangeSearch} placeholder="Search" aria-label="Search" />
                        <NavLink to={searchData.search.length>0?'/search':'/'}   className="btn btn-primary px-4 "
                        style={{fontWeight: 'bolder',lineHeight:'30px'}}>
                          Search
                        </NavLink>
                      </div>
                </div>
             </div>}

        <div className='cate-header d-flex align-items-center justify-content-start gap-4'>
           <NavLink to='/' style={{textDecoration:'none',marginInlineEnd:mobSize.windowSize<'769'?'30px':'150px'}}><h5>Home</h5></NavLink>
           {dataShow}
           {categories.length>8&&<NavLink  to='/categories' style={{textDecoration:'none'}}><h5>Show all</h5></NavLink>}
        </div>
     </div>
    )
}
// (e)=>setSearch(e.target.value)