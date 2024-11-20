import { signIn } from "@/auth";
import Link from "next/link";
import Logo from '@/public/icons/plant_logo.svg';
import { auth } from "@/auth";

export default async  function NavBar() {

    const session = await auth();
    let logButton:React.JSX.Element;
    
    if(session){
        logButton = (
        <Link href ='/signout' className=" transition-colors duration-500  text-mintGreen text-large font-bold hover:text-green-400">Logout</Link>
        );
    }else{
        logButton = (
            <form action={async () => {
                "use server";
                await signIn();
            }}>
                <button type="submit" className=" transition-colors duration-500  text-mintGreen text-large font-bold hover:text-green-400 ">Login</button>
            </form>
        );
    }
   
    return (

        <header className="flex flex-row items-center justify-between px-5 gap-2 h-16 w-full shadow-lg mb-5">


            {/*Plant Emporium Logo  */}
            <div>
                <button>
                    <Logo className=" h-9 w-9 fill-mintGreen inline-block mr-3" height="24px" viewBox="0 -960 960 960" />
                </button>
                <h1 className="inline-block font-extrabold text-mintGreen text-lg align-middle">Plant Emporium</h1>
            </div>


            {/* Menu Open Button */}
            <input type="checkbox" id="sidebar-active" className=" hidden peer" />
            <label htmlFor="sidebar-active" className=" sm:hidden">
                <svg className=" h-9 w-9  fill-mintGreen" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
            </label>


            <nav className=" dotted-background fixed sm:relative flex flex-col sm:flex-row justify-start sm:justify-center  h-screen sm:h-auto w-4/5 sm:w-auto gap-6 p-4 sm:p-0  top-0 -right-full sm:right-auto peer-checked:right-0  z-10 sm:z-0 shadow-lg sm:shadow-none transition-[right] duration-500 ">
                {/* Menu Close Button */}
                <label htmlFor="sidebar-active" className=" sm:hidden">
                    <svg className="h-9 w-9 fill-mintGreen" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                </label>

                {/* Links */}
                <hr className="h-1 sm:hidden   bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <Link href="/" className="transition-colors duration-500 text-mintGreen text-large font-bold  hover:text-green-400 ">Home</Link>
                <hr className=" h-1 sm:hidden  bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <Link href="/about" className=" transition-colors duration-500  text-mintGreen text-large font-bold hover:text-green-400">About</Link>
                <hr className="h-1 sm:hidden  bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <Link href="/products" className=" transition-colors duration-500  text-mintGreen text-large font-bold hover:text-green-400">Products</Link>
                <hr className="h-1 sm:hidden bg-gray-200 border-0 dark:bg-gray-700"></hr>
                {logButton}
                <hr className="h-1 sm:hidden bg-gray-200 border-0 dark:bg-gray-700"></hr>
                
            </nav>

        </header>
    );
}