import Plantlogo from "@/public/icons/plant_logo.svg";
import SocialMediaIcons from "./SocialMediaIcons";
import Link from "next/link";

export default function Footer(){
    return (
        <footer className="flex flex-col  sm:flex-row w-full max-w-[1000px] flex-wrap p-[--mobile-padding] sm:px-[--small-padding] 2xl:px-[--2xl-padding] mx-auto mt-10 gap-3  text-sm">
            
            {/* General message & social media */}
            <div className="  flex flex-col  items-center  basis-full sm:basis-1/2 flex-grow flex-shrink" >  
                <div className="flex flex-row items-center">
                <Plantlogo className='size-10 fill-mintGreen mr-2' />
                <p className="font-bold text-lg">Plant Emporium</p>
                </div>  
                <p className="text-center">At Plant Emporium, we're passionate about helping you bring nature indoors and grow beautiful outdoor gardens. 
                Our curated selection of plants, pots, and gardening supplies are designed to fit any space and style.Thank you for choosing us to be a 
                part of your plant journey - we can't wait to help you grow!</p>
              
               <SocialMediaIcons />
            </div>

            {/* additonal info */}
            <div className=" flex flex-col items-center gap-1 basis-full sm:basis-auto flex-grow-0 flex-shrink-0">
                <p className="font-semibold mb-2">MORE FROM PE</p>
                <Link href="/about" className=" hover:font-bold transition-all duration-300">About Us</Link>
                <Link href="/faq" className=" hover:font-bold transition-all duration-300">General FAQ</Link>
                <Link href="/blogs" className=" hover:font-bold transition-all duration-300">Blogs</Link>
            </div>

            {/* Contact infos */}
            <div className="flex flex-col items-center gap-1 basis-full sm:basis-auto flex-grow-0 flex-shrink-0">
                <p className="font-semibold mb-2">CONTACT</p>
                <Link href="/contact" className=" hover:font-bold transition-all duration-300">Contact Us</Link>
            </div>

            <small className=" w-full text-center">&copy; Copyright 2024 Plant Emporium</small>

        </footer>
    )
}

