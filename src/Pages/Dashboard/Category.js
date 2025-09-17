import axios from "axios";
import { useEffect, useState } from "react";
import {  Form } from "react-bootstrap";
import { baseURL, Cate } from "../../Api/Api";
import Cookie from 'cookie-universal';
import Loading from "../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import ContentHeader from "../../Components/Dashboard/ContentHeader";

export default function Category(){
    const [title,setTitle]=useState('');
    const [image,setImage]=useState('');
    //disable Btn
    const[disable,setDisable]=useState(true);
    //loading
    const[loading,setLoading]=useState(false);
    //cookies
    const cookie=Cookie();
    //use navigate
    const Nav=useNavigate();

    // const id =window.location.pathname.split("/").slice(-1)[0]; <get id with js>

    //get id with useParama()
    const {id}=useParams(); //usePArams is object includes id so {id}=id.id  
    
    //get user info
    useEffect(()=>{
        setLoading(true);
        axios.get(`${baseURL}/${Cate}/${id}`,{
          headers:{
            Authorization:"Bearer " + cookie.get('e-commerce'),
          }
        })
        .then((data)=> setTitle(data.data.title))
        .then(()=>{setLoading(false);
                   setDisable(false);
        })
        .catch(()=>Nav("/dashboard/404" , {replace:true}));
    },[]);
    async function HandleSubmit(e){
      setLoading(true);
      e.preventDefault();
       const form=new FormData();
      form.append('title',title);
      form.append('image',image);
        try{
            const res=await  axios.post(`${baseURL}/${Cate}/edit/${id}`,form,
              {
                headers:{
                  Authorization:"Bearer " + cookie.get('e-commerce'),
                }
              });
              Nav("/dashboard/categories" , {replace:true});
              // window.location.pathname="/dashboard/categories";
        }
        catch(err){
          setLoading(false);
          console.log(err);
        }
    }
      //object header
    const HeaderInfo={
        title:'Edit Category',
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
        className="btn btn-primary mt-3" disabled={disable} >Save</button>
     </Form>
    </div>
  </>  
 )
}