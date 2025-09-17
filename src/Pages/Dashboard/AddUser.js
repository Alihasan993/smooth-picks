import axios from "axios";
import {  useState } from "react";
import {  Form } from "react-bootstrap";
import { baseURL, USER } from "../../Api/Api";
import Cookie from 'cookie-universal';
import Loading from "../../Components/Loading/Loading";
import ContentHeader from "../../Components/Dashboard/ContentHeader";
import {  faUserPlus,} from "@fortawesome/free-solid-svg-icons";

export default function AddUser(){
    const[form,setForm]=useState({
        name:'',
        email:'',
        password:'',
        role:'',
    })
    // const[disable,setDisable]=useState(true);
    const[loading,setLoading]=useState(false);
    //cookies
    const cookie=Cookie();
      
    function handleOnCange(e){
        setForm({...form,[e.target.name]:e.target.value});
    }
    async function HandleSubmit(e){
      setLoading(true);
      e.preventDefault();
        try{
            await  axios.post(`${baseURL}/${USER}/add`,form,
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
        title:'Add User',
        show:false,
        icon:faUserPlus,
    }
 return(
  <>
    {loading && <Loading/>}
    <div className="bg-white w-100">
      <ContentHeader HeaderInfo={HeaderInfo} />
     <Form className="p-2" onSubmit={HandleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:"bold"}}>User Name</Form.Label>
        <Form.Control type="text" value={form.name} name="name" placeholder="Name..."
         required onChange={handleOnCange}/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label style={{fontWeight:"bold"}}>Email address</Form.Label>
        <Form.Control type="email" value={form.email} name="email" placeholder="Email..."
         required onChange={handleOnCange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        <Form.Label style={{fontWeight:"bold"}}>Password</Form.Label>
        <Form.Control type="password" value={form.password} name="password" placeholder="Password..."
         required minLength={8} onChange={handleOnCange}/>
      </Form.Group>

      <Form.Label style={{fontWeight:"bold"}}>Role</Form.Label>
      <Form.Select value={form.role} name="role" required onChange={handleOnCange}>
      <option disabled value="">Select Role</option>
      <option value="1995">Admin</option>
      <option value="1999">product manager</option>
      <option value="2001">User</option>
      </Form.Select>
      <button disabled={form.name.length>1 && form.email.length>1 && form.password.length>7 && form.role.length>0?false:true}
        className="btn btn-primary mt-3" >Add</button>
     </Form>
    </div>
  </>  
 )
}