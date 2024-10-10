import Link from "next/link";

export default function NavBar() {

    return (

        <nav className="flex flex-row items-center justify-between px-5 gap-2 h-16 w-full shadow-lg mb-5">

             
            {/*Plant Emporium Logo  */}
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" className=" h-9 w-9 fill-mintGreen inline-block mr-3" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-200q0-100-70-170t-170-70q0 100 70 170t170 70Zm0-202q26 0 44-18t18-44v-6q8 6 16.5 9t19.5 3q26 0 44-18t18-44q0-20-9.5-35T604-576q17-6 26.5-21t9.5-35q0-26-18-44t-44-18q-11 0-19.5 3t-16.5 9v-6q0-26-18-44t-44-18q-26 0-44 18t-18 44v6q-8-6-16.5-9t-19.5-3q-26 0-44 18t-18 44q0 20 9.5 35t26.5 21q-17 6-26.5 21t-9.5 35q0 26 18 44t44 18q11 0 19.5-3t16.5-9v6q0 26 18 44t44 18Zm0-112q-26 0-44-17.5T418-576q0-26 18-44t44-18q26 0 44 18t18 44q0 27-18 44.5T480-514Zm0 314q100 0 170-70t70-170q-100 0-170 70t-70 170ZM160-80q-33 0-56.5-23.5T80-160v-640q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v640q0 33-23.5 56.5T800-80H160Zm0-80h640v-640H160v640Zm0 0v-640 640Z" /></svg>
                <h1 className="inline-block font-extrabold text-mintGreen text-lg align-middle">Plant Emporium</h1>
            </div>
            
            
            {/* Menu Open Button */}
            <input type="checkbox" id="sidebar-active" className=" hidden peer" />
            <label htmlFor="sidebar-active" className=" sm:hidden">
                <svg className=" h-9 w-9  fill-mintGreen" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>
            </label>
            

            <div className=" dotted-background fixed sm:relative flex flex-col sm:flex-row justify-start sm:justify-center  h-screen sm:h-auto w-4/5 sm:w-auto gap-6 p-4 sm:p-0  top-0 -right-full sm:right-auto peer-checked:right-0  z-10 sm:z-0 shadow-lg sm:shadow-none transition-[right] duration-500 ">
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
                <Link href="proucts" className=" transition-colors duration-500  text-mintGreen text-large font-bold hover:text-green-400">Products</Link>
                <hr className="h-1 sm:hidden bg-gray-200 border-0 dark:bg-gray-700"></hr>
                <Link href="login" className=" transition-colors duration-500  text-mintGreen text-large font-bold hover:text-green-400 ">Login</Link>
                <hr className="h-1 sm:hidden bg-gray-200 border-0 dark:bg-gray-700"></hr>
            </div>

        </nav>
    )
}