import axios from "axios";
import {useState } from "react"
import { baseURL, REGISTER } from "../../Api/Api";
import Loading from "../../Components/Loading/Loading";
import Cookie from 'cookie-universal';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { Link, NavLink, useNavigate } from "react-router-dom";
export default function Register(){
    const[form,setForm]=useState({
        name:'',
        email:'',
        password:''
    });
    // err
    const[err,setErr]=useState("");

    //loading
    const[loading,setLoading]=useState(false);

      //cookies
        const cookie=Cookie();

       //Navigate
    const Navigate=useNavigate();  

    //handle 
    function handleChange (e){
        setForm({...form,[e.target.name]:e.target.value});
    }
    async function handleSubmit(e){
      e.preventDefault();
      setLoading(true);
      try{
       const res= await axios.post(`${baseURL}/${REGISTER}`,form);
       setLoading(false);
       const token=res.data.token;
        cookie.set("e-commerce",token);
      //  window.location.pathname="/dashboard/users";
       Navigate("/" , {replace:true});
      }
      catch(err){
        setLoading(false);
        if(err.response.status===422){
          setErr("Email is already been taken");
        }else{
          setErr("Internal server ERR");
        }
      }
    }
    return(
     <>
      {loading && <Loading/>}
      <div className="container">
        <div className="form-parent">
            <Form className="form" onSubmit={handleSubmit}>
              <p className=" h1 fw-bold mb-5">Register Now</p>
                  <Form.Group className="mb-4 inputParent">
                    <Form.Control className="mb-3" type="text" id="name" 
                     value={form.name} name="name" onChange={handleChange} required placeholder="Name" />
                    <Form.Label className="form-label" htmlFor="name">Name</Form.Label>
                  </Form.Group>

                    <Form.Group className="mb-4 inputParent">
                    <Form.Control className="mb-3" type="email" id="email" 
                     value={form.email} name="email" onChange={handleChange} required placeholder="Email" />
                    <Form.Label className="form-label" htmlFor="email">Email</Form.Label>
                  </Form.Group>

                    <Form.Group className="mb-4 inputParent">
                    <Form.Control className="mb-3" type="password" id="password" minLength={8}
                     value={form.password} name="password" onChange={handleChange} required placeholder="Password" />
                    <Form.Label className="form-label" htmlFor="password">Password</Form.Label>
                  </Form.Group>
                          
                <div className=" d-flex  justify-content-center mx-4 mb-3 mb-lg-4">
                  <button  type="submit" data-mdb-button-init data-mdb-ripple-init
                   className="btn btn-success btn-lg">Register</button>
                </div>
                {/* <div className="mb-4 google-icon">
                  <a className="btn-google" href={`http://127.0.0.1:8000/login-google`}>
                    <Image src="https://www.svgrepo.com/show/475656/google-color.svg" style={{width:"24px"}} />
                    <span> Sign in with Google</span>
                  </a>
                </div> */}
                <h6>Do you have an account??<Link to='/login'> Login</Link></h6>
                <div className="d-flex flex-column align-items-center justify-content-center gap-3 mt-5">
                <Link className="btn-back-web d-block"  to='/'>go to website</Link>
                {err!=="" &&<span className="err-message">{err}</span>}
                </div>
            </Form>
             

        </div>
      </div>
     </>  
    )
}