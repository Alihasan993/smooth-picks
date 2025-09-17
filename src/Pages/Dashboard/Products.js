import axios from "axios";
import { useEffect, useState } from "react";
import { baseURL,  Pro, PRO} from "../../Api/Api";
import Cookie from "cookie-universal";
import TableShow from "../../Components/Dashboard/TableShow";
import ContentHeader from "../../Components/Dashboard/ContentHeader";
import { faCartShopping} from "@fortawesome/free-solid-svg-icons";
export default function Products(){
    //useState for users
    const[data,setData]=useState([]);
    //pagination
    const limit=5;
    const[page,setPage]=useState(1);
    //cookie
    const cookie=Cookie();

      //search
    const[search,setSearch]=useState('');
    async function handleSearch(){
        try{
          const res=await axios.post(`${baseURL}/${Pro}/search?title=${search}`);
          console.log(res);
        }
        catch(err){
          console.log(err);
        }
        }

    //get Products
    useEffect(()=>{
        try{
            axios.get(`${baseURL}/${PRO}`,{
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
    },[]);//use deleteUser here for update useEffect when change useState So update table

    const header=[
       {
          key:'images',
          name:'Images'
       },
       {
          key:'title',
          name:'Title'
       },
       {
          key:'category',
          name:'Category'
       },
       {
          key:'price',
          name:'Price'
       },
       {
          key:'rating',
          name:'Rating'
       },
    ]

   //Delete category
    async function handleDelete(id){
      try{
        await axios.delete(`${baseURL}/${Pro}/${id}`,{
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

     //object content header
    const HeaderInfo={
        title:'Products',
        icon:faCartShopping,
        BtnName:'Add',
        show:true,
        BtnClick:()=>{ window.location.pathname = 'dashboard/product/add'; }
    }
    return (
      <>
    <div className="bg-white w-100 " style={{height:'100vh'}}>
     <ContentHeader HeaderInfo={HeaderInfo} />
     <TableShow
      header={header}
       data={data}
        delete={handleDelete}
        limit={limit}
      page={page}
      setPage={setPage}
      typeSearch='title'
      />
    </div>
    </>
  );
}