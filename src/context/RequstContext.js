import { createContext,  useState } from "react";
export const requstData = createContext("");
export default function RequstContext({children}){
    const[request,setRequest]=useState(false);
    const[latestSale,setlatestSale]=useState([]);
    const[latestProducts,setLatestProducts]=useState([]);
    const[topRating,setTopRating]=useState([]);
    const[products,setProducts]=useState([]);
    const[search,setSearch]=useState('');
    return <requstData.Provider value={{latestProducts ,latestSale ,setlatestSale,search,setSearch,
           setLatestProducts,topRating,setTopRating,products,setProducts,request,setRequest}}>{children}</requstData.Provider>
}