'use server';

import {signIn} from "@/auth";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";

export const signIN = async (provider:string) =>{
    await signIn(provider,{redirectTo: "/dashboard"});
};

export const signOUT = async() => {
    await signOut({redirectTo: '/'});
};

export const sendToSignIn = () => {
    redirect('/');
};