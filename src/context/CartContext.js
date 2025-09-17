import { createContext, useState } from "react";

export const Cart = createContext("");
export default function CartContext({children}){
    const [changeCart,setChangeCart]=useState(true);
    const[LatestSale,setLatestSale]=useState([]);
    return <Cart.Provider value={{changeCart ,LatestSale ,setLatestSale, setChangeCart}}>{children}</Cart.Provider>
}