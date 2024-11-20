import SignIn from "@/src/components/SignIn";
import { providerMap } from "@/auth";
import Image from "next/image";
import LogoutImage from "@/public/icons/logoutImage.webp";

export default async function SignInPage({
    searchParams}:{
        searchParams:Promise< {callbackUrl: string | undefined}>
    }){

        const s = await searchParams;
        
    return (
        
        

        <div className=" absolute  shadow-lg top-1/2 -translate-y-1/2  left-0 right-0  w-4/5 md:h-1/2 xl:h-3/5 max-h-[750px] max-w-[750px] mx-auto px-4 py-20 md:py-4 flex flex-col md:flex-row items-center  bg-mintGreen rounded-lg ">
            <div className="relative w-1/2 h-full hidden sm:block rounded-lg">
                <Image
                    alt="vector art of pothos plant leaves"
                    fill={true}
                    src={LogoutImage}
                    priority={true}
                />
            </div>

        <div className="w-full md:w-1/2 flex flex-col gap-8 items-center">
        <h1 className="font-extrabold text-2xl text-center">Welcome to Plant Emporium</h1>
            <p className="font-semibold text-center">Please use one of the providers</p>
            
            {providerMap.map(provider => {
                return (
                   
                    <SignIn key={provider.id} provider={provider.id} callbackUrl={s.callbackUrl} />
                );
            })}
        </div>

    </div>
    );
}

//TODO: fix redirect issue