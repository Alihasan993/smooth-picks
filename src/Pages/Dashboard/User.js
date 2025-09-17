import axios from "axios";
import { useEffect, useState } from "react";
import {  Form } from "react-bootstrap";
import { baseURL, USER } from "../../Api/Api";
import Cookie from 'cookie-universal';
import Loading from "../../Components/Loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import ContentHeader from "../../Components/Dashboard/ContentHeader";

export default function User(){
    const[form,setForm]=useState({
        name:'',
        email:'',
        role:'',
    })
    const[disable,setDisable]=useState(true);
    const[loading,setLoading]=useState(false);
    //cookies
    const cookie=Cookie();
    //use navigate
    const Nav=useNavigate();
      
    // const id =window.location.pathname.split("/").slice(-1)[0]; <get id with js>

    //get id with useParama()
    const {id}=useParams(); //usePArams is object includes id so {id}=id.id  
    
    function handleOnCange(e){
        setForm({...form,[e.target.name]:e.target.value});
    }
    useEffect(()=>{
        setLoading(true);
        axios.get(`${baseURL}/${USER}/${id}`,{
          headers:{
            Authorization:"Bearer " + cookie.get('e-commerce'),
          }
        })
        .then((data)=>setForm({
          name:data.data.name,
          email:data.data.email,
          role:data.data.role,
        })).then(()=>{setDisable(false);setLoading(false);}).catch(()=>Nav("/dashboard/404" , {replace:true}));
    },[]);
    async function HandleSubmit(e){
      setLoading(true);
      e.preventDefault();
        try{
            const res=await  axios.post(`${baseURL}/${USER}/edit/${id}`,form,
              {
                headers:{
                  Authorization:"Bearer " + cookie.get('e-commerce'),
                }
              });
              window.location.pathname="/dashboard/users";
        }
        catch(err){
          setLoading(false);
          console.log(err);
        }
    }
      //object header
    const HeaderInfo={
        title:'Edit User',
        show:false,
    }
 return(
  <>
    {loading && <Loading/>}
    <div className="bg-white w-100">
      <ContentHeader HeaderInfo={HeaderInfo} />
     <Form className="p-2" onSubmit={HandleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"bold"}}>User Name</Form.Label>
        <Form.Control type="text" value={form.name} name="name" required onChange={handleOnCange}/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label style={{fontWeight:"bold"}}>Email address</Form.Label>
        <Form.Control type="email" value={form.email} name="email" required onChange={handleOnCange}/>
      </Form.Group>

      <Form.Label style={{fontWeight:"bold"}}>Role</Form.Label>
      <Form.Select value={form.role} name="role" required onChange={handleOnCange}>
      <option disabled value="">Select Role</option>
      <option value="1995">Admin</option>
      <option value="1999">product manager</option>
      <option value="2001">User</option>
      </Form.Select>
      <button className="btn btn-primary mt-3" disabled={disable}>save</button>
     </Form>
    </div>
  </>  
 )
}