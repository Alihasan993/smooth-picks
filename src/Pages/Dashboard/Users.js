import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL, USER, USERS } from "../../Api/Api";
import Cookie from "cookie-universal";
import TableShow from "../../Components/Dashboard/TableShow";
import ContentHeader from "../../Components/Dashboard/ContentHeader";
import { faUsers} from "@fortawesome/free-solid-svg-icons";
export default function Users(){
    //useState for users
    const[data,setData]=useState([]);

    //useState for current user
    const[currentUser,setcurrentUser]=useState([]);
   //pagination
    const limit=5;
    const[page,setPage]=useState(1);
    //cookie
    const cookie=Cookie();

    //get current user
    useEffect(()=>{
     
        try{
            axios.get(`${baseURL}/${USER}`,{
                headers:{
                    Authorization: 'Bearer ' + cookie.get('e-commerce'),
                },
            })
            //i am useing then because i am useing try with out (asyn,await)
            .then((res)=>{setcurrentUser(res.data);
                  
        });
        }
        
        catch(err){
            console.log(err);
        }
    },[]);

    //get users
    useEffect(()=>{
        try{
            axios.get(`${baseURL}/${USERS}`,{
                headers:{
                    Authorization: 'Bearer ' + cookie.get('e-commerce'),
                },
            })
            //i am useing then because i am useing try with out (asyn,await)
            .then((data)=>setData(data.data));
        }
        
        catch(err){
            console.log(err);
        }
    },[]);
    
    //object header for table
    const header=[
       
       {
          key:'name',
          name:'User Name'
       },
       {
          key:'email',
          name:'Email'
       },
        {
          key:'role',
          name:'Role'
       }
    ]
    //object content header
    const HeaderInfo={
        title:'Users',
        BtnName:'Add',
        icon:faUsers,
        show:true,
        BtnClick:()=>{ window.location.pathname = 'dashboard/user/add'; }
    }

   //Delete user
    async function handleDelete(id){
      try{
        await axios.delete(`${baseURL}/${USER}/${id}`,{
                headers:{
                    Authorization: 'Bearer ' + cookie.get('e-commerce'),
                },
            }
        
        );
        setData((prov)=>prov.filter((item)=>item.id!==id));
      }
      catch(err){
        console.log(err);
      }
    } 
    return (
      <>
    <div className="bg-white w-100" style={{height:'100vh'}}>
    <ContentHeader HeaderInfo={HeaderInfo} />
     <TableShow
      header={header}
       data={data}
        delete={handleDelete}
         currentUser={currentUser}
         limit={limit}
      page={page}
      setPage={setPage}
      typeSearch='name'
      />
    </div>
    </>
  );
}


//cuurent user don't show and show messege(user no found)

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { baseURL, USER, USERS } from "../../Api/Api";
// import Cookie from "cookie-universal";
// import { Table } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
// export default function Users(){
//     //useState for users
//     const[data,setData]=useState([]);

//     //useState for current user
//     const[userData,setUserData]=useState([]);

//     //useState for update after delete user
//     const[deleteUser,setDeleteUser]=useState(false);

//     //cookie
//     const cookie=Cookie();

//     //get current user
//     useEffect(()=>{
//         try{
//             axios.get(`${baseURL}/${USER}`,{
//                 headers:{
//                     Authorization: 'Bearer ' + cookie.get('e-commerce'),
//                 },
//             })
//             //i am useing then because i am useing try with out (asyn,await)
//             .then((res)=>setUserData(res.data));
//         }
        
//         catch(err){
//             console.log(err);
//         }
//     },[]);

//     //get users
//     useEffect(()=>{
//         try{
//             axios.get(`${baseURL}/${USERS}`,{
//                 headers:{
//                     Authorization: 'Bearer ' + cookie.get('e-commerce'),
//                 },
//             })
//             //i am useing then because i am useing try with out (asyn,await)
//             .then((data)=>setData(data.data));
//         }
        
//         catch(err){
//             console.log(err);
//         }
//     },[deleteUser]);//use deleteUser here for update useEffect when change useState So update table

//     //filter by id without current user
//     const filteData=data.filter((users)=> users.id!==userData.id);

//     //map for show
//     const dataShow=filteData.map((item,key)=>
//         <tr key={key}>
//          <td>{key+1}</td>
//          <td>{item.name}</td>
//          <td>{item.email}</td>
//          <td>{item.role==="1995"?"Admin":item.role==="2001"?"User":"Writer"}</td>
//          <td>
//            <div className="d-flex align-items-center gap-2 ">
//              <Link to={`${item.id}`}> <FontAwesomeIcon fontSize={'20px'} icon={faPenToSquare} /></Link>
//               {/* {}=>because jsx
//               `${}`=> because must inside (to) link '' */}
//               <FontAwesomeIcon onClick={()=>handleDelete(item.id)} cursor={'pointer'} fontSize={'20px'} color={'red'} icon={faTrash} />
//            </div>
//          </td>
//         </tr> 
//     )
//     //Delete user
//     async function handleDelete(id){
//       try{
//         await axios.delete(`${baseURL}/${USER}/${id}`,{
//                 headers:{
//                     Authorization: 'Bearer ' + cookie.get('e-commerce'),
//                 },
//             });
//         setDeleteUser((prov)=>!prov);
//       }
//       catch(err){
//         console.log(err);
//       }
//     }  
//     return (
//     <div className="bg-white w-100 p-2" style={{height:'100vh'}}>
//      <h1>Users page</h1>
//      <Table className="users-table" striped bordered hover>
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>User Name</th>
//           <th>Email</th>
//           <th>Role</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {/* loading until get users */}
//         {data.length===0?<tr><td colSpan={12} style={{textAlign:"center",fontSize:"20px",fontWeight:"bold",color:"#3eb57ec2"}}>Loading...</td></tr>
//           :data.length===1?<tr><td colSpan={12} style={{textAlign:"center",fontSize:"20px",fontWeight:"bold",color:"red"}}>User Not Found</td></tr>
//           : dataShow}
//       </tbody>
//      </Table>
//     </div>
//   );
// }




    