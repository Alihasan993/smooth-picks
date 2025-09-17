import axios from "axios";
import {  useContext, useEffect, useRef, useState } from "react";
import {  Form } from "react-bootstrap";
import { baseURL, CAT, Pro } from "../../Api/Api";
import Cookie from 'cookie-universal';
import Loading from "../../Components/Loading/Loading";
import ContentHeader from "../../Components/Dashboard/ContentHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp,faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { requstData } from "../../context/RequstContext";

export default function Product(){
    //context for update data website
    const reqData=useContext(requstData);
    const [form,setForm]=useState({
        category:'Select Category',
        title:'',
        description:'',
        price:0,
        discount:0,
        About:'',
    });
    //images
    const [images,setImages]=useState([]);
    // images from back 
    const [serverImages,setServerImages]=useState([]);
    //categories
    const [categories,setCategories]=useState([]);
    //loading
    const[loading,setLoading]=useState(false);
    //id for images delete
    const[idImagesDelete,setIdImagesDelete]=useState([]);
    //cookies
    const cookie=Cookie();
    //use navigate
    const Nav=useNavigate();
    //id
    const {id}=useParams();

    //handleOnChange
    function handleOnChange (e){
    setForm({...form,[e.target.name]:e.target.value});
    }

   //get current product
   useEffect(()=>{
        setLoading(true);
        axios.get(`${baseURL}/${Pro}/${id}`,{
          headers:{
            Authorization:"Bearer " + cookie.get('e-commerce'),
          }
        })
        .then((data)=>{setForm(data.data[0]);
                       setServerImages(data.data[0].images);
        })
        .then(()=>{setLoading(false);})
        .catch(()=>Nav("/dashboard/404" , {replace:true}));
    },[]);
   //get categories
    useEffect(()=>{
        try{
            axios.get(`${baseURL}/${CAT}`,{
                headers:{
                    Authorization: 'Bearer ' + cookie.get('e-commerce'),
                },
            })
            //i am useing then because i am useing try with out (asyn,await)
            .then((data)=>setCategories(data.data));
        }
        
        catch(err){
            console.log(err);
        }
    },[]);

    //handle submit
    async function HandleSubmit(e){
      setLoading(true);
      e.preventDefault();
      const data=new FormData();
      data.append('category',form.category);
      data.append('title',form.title);
      data.append('description',form.description);
      data.append('price',form.price);
      data.append('discount',form.discount);
      data.append('About',form.About);
      // data.append('stock',form.stock);
      for(let i=0;i<images.length ; i++){
        data.append('images[]',images[i]);
      }
        try{

            for(let i=0;i<idImagesDelete.length;i++){
              await axios.delete(`${baseURL}/product-img/${idImagesDelete[i]}`,{
                headers:{
                  Authorization:"Bearer " + cookie.get('e-commerce'),
                }
              }).then((data)=>console.log(data))
            }

            await  axios.post(`${baseURL}/${Pro}/edit/${id}`,data,
              {
                headers:{
                  Authorization:"Bearer " + cookie.get('e-commerce'),
                }
              });
              reqData.setRequest((prev)=>!prev);
              // window.location.pathname="/dashboard/products";
              Nav("/dashboard/products" , {replace:true});
        }
        catch(err){
          setLoading(false);
          console.log(err);
        }
    }
    //handle Image Delete
    function handleImagesDelete(file){
        setImages((prev)=>prev.filter((img)=>img!==file));
    }
    
    //handle server Image Delete
    async function handleServerImageDelete(id){
        setServerImages((prev)=>prev.filter((img)=>img.id!==id));
        setIdImagesDelete((prev)=>[...prev,id]);
       
    }

    //useRef for upload images
    const openImage=useRef();
    function handleOpenImage(){
     openImage.current.click();
    }
    
     //object header
    const HeaderInfo={
        title:'Edit Product',
        show:false,
    }
    //Mapping
    const cateShow=categories.map((item)=>
       <option value={item.id}>{item.title}</option>
    )
    const imageShow=images.map((img,key)=>
      <div key={key} className="d-flex align-items-start justify-content-between gap-2 border">
       <div className="d-flex gap-2"> 
        <img src={URL.createObjectURL(img)} style={{width:'100px',height:'80px'}} alt='img'/> 
        <div>
          <p>{img.name}</p>
          <p className="d-block">{(img.size / 1024)<1000?
          (img.size / 1024).toFixed(2) + 'KB':(img.size / (1024*1024)).toFixed(2) + 'MB'}</p>
        </div>
       </div>
        <div className="d-flex justify-content-center align-items-center" style={{borderRadius:'5px',width:'72px',height:'38px'
        ,backgroundColor:'red',color:'white'}}
         onClick={()=>handleImagesDelete(img)}>Delete</div>
      </div>
    )
    const serverImageShow=serverImages.map((img,key)=>
     <div key={key} className="position-relative mb-3" style={{border:'2px solid black'}}>
      <FontAwesomeIcon className="position-absolute" onClick={()=>handleServerImageDelete(img.id)}
       style={{right:'-7px',top:'-7px'}} icon={faCircleXmark} color={'red'} fontSize={'25px'}/>
      <img src={img.image} style={{width:'150px',height:'150px'}} alt='img'/>
     </div>
   )
 return(
  <>
    {loading && <Loading/>}
    <div className="bg-white w-100 ">
     <ContentHeader  HeaderInfo={HeaderInfo} />
     <Form className="p-2" onSubmit={HandleSubmit}>  
      <Form.Select value={form.category} name="category" required onChange={handleOnChange}>
        <option disabled>Select Category</option>
        {cateShow}
      </Form.Select>

      <Form.Group className="mb-3" controlId="title">
        <Form.Label style={{fontWeight:"bold"}}>Title</Form.Label>
        <Form.Control type="text" name="title" value={form.title}  placeholder="Title..."
         required onChange={handleOnChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="description">
        <Form.Label style={{fontWeight:"bold"}}>Description</Form.Label>
        <Form.Control type="text" name="description" value={form.description}   placeholder="Description..."
         required  onChange={handleOnChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="price">
        <Form.Label style={{fontWeight:"bold"}}>Price</Form.Label>
        <Form.Control type="number" name="price" value={form.price}  placeholder="Price..."
         required  onChange={handleOnChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="discount">
        <Form.Label style={{fontWeight:"bold"}}>Discount</Form.Label>
        <Form.Control type="number" name="discount" value={form.discount}  placeholder="Discount..."
         required  onChange={handleOnChange}/>
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="stock">
        <Form.Label style={{fontWeight:"bold"}}>Stock</Form.Label>
        <Form.Control type="number" name="stock" value={form.stock}  placeholder="Stock..."
         required onChange={handleOnChange}/>
      </Form.Group> */}

      <Form.Group className="mb-3" controlId="About">
        <Form.Label style={{fontWeight:"bold"}}>About</Form.Label>
        {/* <Form.Control type="text" name="About" value={form.About}  placeholder="About..."
         required  onChange={handleOnChange}/> */}
         <Form.Control as="textarea" rows={3} name="About" value={form.About}  placeholder="About..."
         required  onChange={handleOnChange}  />
      </Form.Group>

      <Form.Group className="mb-3"  controlId="images">
        <Form.Label style={{fontWeight:"bold"}}>Image</Form.Label>
        <Form.Control type="file" hidden placeholder="Image..." multiple
         required ref={openImage}  onChange={(e)=>setImages((prev)=>[...prev,...e.target.files])}/>
         <div className="d-flex justify-content-center align-items-center w-100"
          style={{border:'2px dashed blue'}}  onClick={handleOpenImage}>
          <FontAwesomeIcon icon={faCloudArrowUp}  fontSize={'170px'} color={'blue'}/>
         </div>
      </Form.Group>
      <div className="d-flex justify-content-start align-items-center gap-2 w-100">
        {serverImageShow}
      </div>
      <div className="d-flex flex-column gap-2">
         {imageShow}
      </div>
      <button className="btn btn-primary mt-3"  >Add</button>

     </Form>
    </div>
  </>  
 )
}