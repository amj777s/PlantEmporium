import { signIN } from "../actions/actions";
import GoogleIcon from "@/public/icons/googleIcon.svg";
import GithubIcon from "@/public/icons/githubIcon.svg";


export default function SignIn({
    provider,
    callbackUrl
}:{
    provider: string,
    callbackUrl: string | undefined
}){

    const updatedSignIn = signIN.bind(null, provider, callbackUrl);
    const capitalizedProvider = provider.charAt(0).toUpperCase() + provider.slice(1);
    
    
    return (
        <form action={updatedSignIn} className="flex flex-row bg-white items-center p-1 rounded-md gap-2    ">
            {provider === "GitHub" && <GithubIcon className='size-6' />}
            {provider === "Google" && <GoogleIcon className='size-6' />}
            <button className="  rounded-lg" type="submit">{`Continue with ${capitalizedProvider}`}</button>
        </form>
    );
}