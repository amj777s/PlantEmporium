
import { signOUT } from "@/src/actions/actions";
import LogoutIcon from "@/public/icons/logutIcon.svg";
import LogoutImage from '@/public/icons/logoutImage.webp';
import Image from "next/image";

export default function SignOutPage() {
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
                <LogoutIcon className=" size-16 " />
                <h1 className="font-extrabold text-2xl text-center">Are you Sure you want to sign out?</h1>
                <form action={signOUT} className="">
                    <button className=" font-bold block bg-white p-3 rounded-lg" type="submit">Sign Out</button>
                </form>
            </div>

        </div>
    );
}