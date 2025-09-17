import axios from "axios";
import {  useState } from "react";
import {  Form } from "react-bootstrap";
import { baseURL,  Cate, } from "../../Api/Api";
import Cookie from 'cookie-universal';
import Loading from "../../Components/Loading/Loading";
import ContentHeader from "../../Components/Dashboard/ContentHeader";
import { faPlus} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function AddCategory(){
    const [title,setTitle]=useState('');
    const [image,setImage]=useState('');
    const[loading,setLoading]=useState(false);
    //cookies
    const cookie=Cookie();
    //Navigate
    const Navigate=useNavigate();
    
   //handle submit
    async function HandleSubmit(e){
      setLoading(true);
      e.preventDefault();
      const form=new FormData();
      form.append('title',title);
      form.append('image',image);
        try{
            await  axios.post(`${baseURL}/${Cate}/add`,form,
              {
                headers:{
                  Authorization:"Bearer " + cookie.get('e-commerce'),
                }
              });
              Navigate("/dashboard/categories" , {replace:true});
              // window.location.pathname="/dashboard/categories";
        }
        catch(err){
          setLoading(false);
          console.log(err);
        }
    }

     //object header
    const HeaderInfo={
        title:'Add Category',
        icon:faPlus,
        show:false,
    }
 return(
  <>
    {loading && <Loading/>}
    <div className="bg-white w-100 ">
      <ContentHeader  HeaderInfo={HeaderInfo} />
     <Form className="p-2" onSubmit={HandleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"bold"}}>Title</Form.Label>
        <Form.Control type="text" value={title}  placeholder="Title..."
         required onChange={(e)=>setTitle(e.target.value)}/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label style={{fontWeight:"bold"}}>Image</Form.Label>
        <Form.Control type="file" placeholder="Image..."
         required onChange={(e)=>setImage(e.target.files.item(0))}/>
      </Form.Group>
         <button
        className="btn btn-primary mt-3" disabled={title.length>0?false:true} >Add</button>
     </Form>
    </div>
  </>  
 )
}