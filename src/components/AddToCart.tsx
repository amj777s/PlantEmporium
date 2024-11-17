//TODO: provide method for add to cart that adds item to ItemCart table, provided the user exists, otherwise add to guest shopping cart in localStorage

"use client";

import { useState, useActionState, useEffect } from "react";
import { AddInCart } from "@/src/actions/actions";
import { toast } from "react-toastify";


export default function AddToCart({
    productId,
    itemStock
}:{
    productId: number,
    itemStock: number
}) {

    
    const [itemAmount, SetItemAmount] = useState<number | ''>(0);
    const [cartState, formAction, isPending] = useActionState(AddInCart.bind(null, productId, itemStock), {error: false, message: ''});

    useEffect(()=> {
        if(!cartState.error && cartState.message === "Added To Cart!"){
            toast.success("Added To Cart!",{
                autoClose: 3000
            })
        }
    },[cartState]);
    
    /** 
     * handles the incrementing of the react itemAmount state with the plus button 
    */
    const handleAddItem = () => {
        if(itemAmount === ''){
            SetItemAmount(1);
        }else{
            SetItemAmount(itemAmount + 1);
        }
        
        
    };

    /** 
     * handles the deincrementing of the react itemAmount state with the minus button 
    */
    const handleRemoveItem = () => {
        
        if(!itemAmount){
            return;
        }
        
        SetItemAmount(itemAmount - 1);
    };


     /** 
     * handles the setting  of the react itemAmount state by user input without using the plus or minus button
    */
    const handleSpecifyItemAmount = (e:React.ChangeEvent<HTMLInputElement>) => {
       
        const numberedValue = Number(e.target.value);
      
        if(Number.isNaN(numberedValue)){
            return;
       }else  if(e.target.value === ''){
        SetItemAmount('');
       }else{
        SetItemAmount(numberedValue);
       }   
    };

    const buttonMessage = isPending? <><svg className="animate-spin size-6 fill-black inline-block" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/></svg>Adding to Cart...</>: "Add to Cart";

    return (
        <>
        <form action={formAction} className="w-full my-3 flex items-center">
            <button type="button" onClick={handleRemoveItem} disabled={!itemAmount}><svg className="size-9" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M200-440v-80h560v80H200Z" /></svg></button>
             <input inputMode="numeric" name="amount"  className="size-10 mx-3 content-center text-center font-bold" pattern="\d*"  value={itemAmount} min={0} onChange={handleSpecifyItemAmount} required/>
             <button type="button" onClick={handleAddItem}><svg className="size-9" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg></button>
            <button type="submit" className=" py-3 w-40  ml-auto font-bold  bg-mintGreen hover:bg-green-400 transition-colors duration-500" disabled={isPending || itemAmount=== 0}>{buttonMessage}</button>
        </form>
        {cartState.error  && !isPending && <p className=" self-start text-red-600 font-bold">{cartState.message}</p>}
        </>
    );
}
