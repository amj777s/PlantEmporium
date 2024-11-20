import { useState, useEffect } from "react";

export const useWarningStatus = () => {
    const [isVisible, toggleIsVisible] = useState<boolean>(false);

    useEffect(()=> {
        
        if(isVisible){
            const warningId = setTimeout(()=> {
                toggleIsVisible(!isVisible);
            },3000);

            return clearTimeout(warningId);
        }
    }, [isVisible]);


    return [isVisible, toggleIsVisible];
};