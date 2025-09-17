import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import PaginatedItems from "../pagination/pagination";
import { useState } from "react";

export default function TableShow(props){
    //current user
    const currentUser=props.currentUser || false;
    //handle paginate
    const start=(props.page-1)*props.limit;
    const end =start + props.limit;
    const final=props.data.slice(start,end);
    //search
    const[search,setSearch]=useState('');
    const dataFilter=props.data.filter((e)=>{return e[props.typeSearch].toLowerCase().includes(search.toLowerCase())});
    const dataSearch=search===''?final:dataFilter;
    //get table header
    const headerShow= props.header.map((header)=>
        <th >{header.name}</th>
    )
     
    //get table data
     const dataShow= dataSearch.map((user,key)=>
        <tr key={key}>
          <td>{user.id}</td> 
          {props.header.map((item)=>
          <td >
            {
            item.key==='images'?
            user[item.key].map((img,key)=>
           key<4 && <img  width='60px' style={{marginInline:'2px'}} height='40px'src={img.image } alt="img" />)
            :
            item.key==='image'?
            <img width='60px' height='40px'src={user[item.key] } alt="img" />
            :user[item.key]==='1995'?
            'Admin'
            :user[item.key]==='1996'?
            'Writer'
            :user[item.key]==='1999'?
            'Product Manager'
            :user[item.key]==='2001'?
            'User'
           :user[item.key] }
           {currentUser&&user[item.key]===currentUser.name&&'(You)'}
          </td>
          
          )
           }
           
          
           <td>
            <div className="d-flex align-items-center gap-2 ">
              <Link to={`${user.id}`}> <FontAwesomeIcon fontSize={'20px'}  icon={faPenToSquare} /></Link>
              {/* {}=>because jsx
              `${}`=> because must inside (to) link '' */}
           {user.id!==currentUser.id&&<FontAwesomeIcon onClick={()=>props.delete(user.id)} cursor={'pointer'} fontSize={'20px'} color={'red'} icon={faTrash} />}
            </div>
          </td>

        </tr>
    )

    return(
      <>
        <div>
          <div className="row justify-content-center">
            <form className="d-flex">
              <div className="input-group">
                <input className="form-control table-search form-control-lg"
                value={search} onChange={(e)=>setSearch(e.target.value)} type="search" placeholder="Search..." aria-label="Search" />
               </div>
            </form>
          </div>
        </div>
        <div className="div-parent-table">
        <Table className="users-table" striped bordered hover>
      <thead>
        <tr>
          <th style={{width:'50px'}}>id</th>
          {headerShow}
          <th style={{width:'70px'}}>Action</th>
        </tr>
      </thead>
      <tbody>
        {/* loading until get users */}
        {props.data.length===0?<tr><td colSpan={12} style={{textAlign:"center",fontSize:"20px",fontWeight:"bold",color:"#3eb57ec2"}}>Loading...</td></tr>
          : dataShow}
      </tbody>
     </Table>
     </div>
     <PaginatedItems data={props.data} setPage={props.setPage} itemsPerPage={props.limit}/>
     </>
    )
}