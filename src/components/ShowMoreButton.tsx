"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {  useTransition } from "react";


export default function ShowMoreButton() {

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname: string = usePathname();
    const [isPending, startTransition] = useTransition();

    // allows the user to load more products when clicking on "show more" button
    const handleLoadMore = (): void => {

        startTransition(() => {
            let params: URLSearchParams;

            if (searchParams.get('page') === null) {
                params = new URLSearchParams('page=1');
            } else {
                params = new URLSearchParams(searchParams);
                const  page = Number(searchParams.get('page')) + 1;
                params.set('page', page.toString());
            }

            // potentially push first page and then replace successive pages

            if (searchParams.get('page') === null) {
                router.push(`${pathname}?${params}`, { scroll: false });
            } else {
                router.replace(`${pathname}?${params}`, { scroll: false });
            }

        });

    };

    const buttonMessage:string = isPending? "Loading" : "Show More";



    return (

             <button disabled={isPending} className="  p-2 font-bold rounded-full border-mintGreen  disabled:bg-mintGreen border-4   hover:bg-mintGreen transition-colors duration-500  disabled:animate-bright   " onClick={handleLoadMore}>{buttonMessage}</button>
      
    )
};
