'use client';

import FacebookLogo from "@/public/icons/facebookIcon.svg";
import TiktokLogo from "@/public/icons/tiktokIcon.svg";
import YoutubeLogo from "@/public/icons/youtubeIcon.svg";
import InstagramLogo from "@/public/icons/instagramIcon.svg";
import { toast } from "react-toastify";


export default function SocialMediaIcons() {

    // Alerts user that the respective social media page is not currentlly available
    const handleMediaNotification = (e:React.MouseEvent<HTMLButtonElement>, socialMedia:string)=> {
        e.preventDefault();
        toast.info(`${socialMedia} page is currently under construction. `);
    }
    
    return (
        <div className="flex flex-row gap-3">
            <button onClick={(e)=> handleMediaNotification(e,'Facebook')}><FacebookLogo  className='size-8'/></button>
            <button onClick={(e)=> handleMediaNotification(e,'Tiktok')}><TiktokLogo  className='size-8' /></button>
            <button onClick={(e)=>handleMediaNotification(e,'Youtube')}><YoutubeLogo  className='size-8' /></button>
            <button onClick={(e) => handleMediaNotification(e,'Instagram')}><InstagramLogo className='size-8' /></button>
        </div>
    )
}