"use client";

import { useActionState, useEffect, useRef, useState} from "react";
import { addReview } from "../actions/actions";
import LoadSpin from "@/public/icons/loading.svg";
import CloseButton from '@/public/icons/close.svg';
import { toast } from "react-toastify";


export default  function ReviewModal({
    isOpen,
    closeModal,
    productId
}:{
    isOpen: boolean
    closeModal: () => void,
    productId: number
}){
    
 
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const reviewRef = useRef<HTMLTextAreaElement>(null);
    const [reviewLength, setReviewLength] = useState<number>(0);
    const [titleLength, setTitleLength] = useState<number>(0);
    const [formState, formAction, isPending] = useActionState(addReview.bind(null, productId),{error: false, message: '',data: {title: "",rating:5, review: ""}});

    useEffect(()=> {
        // handles opening and closing of reviewModal
        if(isOpen){
            
            dialogRef.current?.showModal();
        
        }else{
            
            dialogRef.current?.close();
            
        }

        if(formState.message === "Review Created!" ){
            toast.success('Review Created!', {autoClose: 3000});
            closeModal(); // sets isOpen to false
            
        }
    },[isOpen,formState, closeModal]);


    /**
    *   sets reviewlength react state for showing character count of review
    */
    const CountReviewCharacters = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setReviewLength(e.target.textLength);
        
    };

    /**
    *   sets Titlelength react state for showing character count of review
    */
    const CountTitleCharacters = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTitleLength(e.target.value.length);
    };

    const buttonMessage = isPending? <><LoadSpin className="animate-spin size-6 mr-3 fill-black inline-block"/>Submitting...</>: "Submit";

    return (
        <dialog  ref={dialogRef} className="  top-0 left-0 right-0 bottom-0 p-3 sm:py-10 sm:px-5 m-auto w-3/4 max-w-[700px]  rounded-lg  bg-mintGreen " onCancel={closeModal}>
            <form action={formAction} className="flex flex-col">
                <button type="button" onClick={closeModal} className="self-end"><CloseButton className ="size-5"/></button>
                <label htmlFor="title" className="font-semibold">Title</label>
                <input ref={titleRef} id="title" name="title" type="text" className="p-1 bg-slate-200 border rounded-md  border-slate-300 invalid:text-red-500 invalid:ring-red-500" placeholder="Most important to know?" defaultValue={formState.data.title}  autoFocus={true} required={true} minLength={1} maxLength={40} onChange={CountTitleCharacters} />
                <aside className=" sm:mb-5 font-semibold">{`${titleLength}/40`}</aside>
                <label htmlFor="rating" className="font-semibold">Rating</label>
                <input id="rating" name="rating" inputMode="numeric" type="number" aria-placeholder="Out of Five Stars" className="p-1 sm:mb-5 bg-slate-200 border rounded-md border-slate-300 invalid:text-red-500 invalid:ring-red-500" placeholder="Out of Five Stars" defaultValue={formState.data.rating} min={1} max={5} step={1} required={true} />
                <label htmlFor="review"  className="font-semibold">Review</label>
                <textarea ref={reviewRef} id="review" name="review" rows={5} className=" p-1 bg-slate-200 border rounded-md border-slate-300 invalid:text-red-500 invalid:ring-red-500" defaultValue={formState.data.review} required={true} maxLength={2000} onChange={CountReviewCharacters}>
                </textarea>
                <aside className=" sm:mb-5 font-semibold">{`${reviewLength}/2000`}</aside>
                {formState.error && <p className=" text-red-500 font-semibold mb-3">{formState.message}</p>}
                <button className="border-2 rounded-lg border-black p-3 mt-3 font-semibold w-3/4 sm:w-1/4 self-center   hover:bg-green-400 transition-colors duration-500" disabled={isPending}>{buttonMessage}</button>
            </form>
        </dialog>
       
    );
}


