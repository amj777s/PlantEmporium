import { signIN } from "../actions/actions";

export default function SignIn({
    provider
}:{
    provider: string
}){

    const updatedSignIn = signIN.bind(null, provider);
    
    return (
        <form action={updatedSignIn} className=" w-1/2 p-5">
            <button className="mx-auto block bg-slate-500" type="submit">{`Sign In with ${provider}`}</button>
        </form>
    );
}