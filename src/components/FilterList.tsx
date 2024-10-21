//TODO: filter list should be generated automatically by pulling types from db then mapping
//      create form action for filtering
'use client';
import {  usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function FilterList({
    productTotal
}: {
    productTotal: number
}) {

    const pathName = usePathname();
    const router = useRouter();
    const prevSearchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    /**
     * handles form submission to update url params to show related products given selected filter options
     * @param formData formData used in providing params for newUrl
     * @returns void
     */
    const handleFilter = (formData: FormData):void => {
      

        for (const [name,value] of formData.entries()) {
            console.log(name,value);
        }

        startTransition(()=> {
            // Create new params since we dont care about page params when filter is applied. Want to show all related products
            let params = new URLSearchParams();
            
            for(const [name,value] of formData.entries()){
                params.append(name, String(value));
            }
            

            const url:string = `${pathName}?${params.toString()}`

            // Only want to replace when not on main products page
            if(prevSearchParams.get('page') === null){
                router.push(url);
            }else{
                router.replace(url);
            }


        })
    }

    return (
        <>
            {/* Input for controlling filter menu visibility */}
            <input type="checkbox" id="filterList-active" className="hidden peer" />

            {/* Filter button */}
            <div className="flex flex-row items-center w-full">
                <label htmlFor="filterList-active">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block align-middle" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-308 198-252H282l198 252Zm0 0Z" /></svg>
                    <h3 className=" font-semibold inline-block align-middle  ">Filter</h3>
                </label>

                <aside className="text-sm font-semibold text-zinc-400 ml-auto">{`${productTotal} results`}</aside>
            </div>

            {/* Filter Menu */}
            <form action={handleFilter} className=" flex flex-col p-3 fixed w-4/5 h-screen  dotted-background top-0 -right-full peer-checked:right-0 z-10 transition-[right] duration-500">

                {/* make tabable */}
                <label htmlFor="filterList-active" className="">
                    <svg className="h-9 w-9 fill-mintGreen" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                </label>


                <p className="text-center text-gray-400">Filter and Sort</p>

                <details name="filter" className="">
                    <summary className=" py-2 bg-mintGreen hover:brightness-75 transition-[filter] duration-500">Lighting Requirements</summary>

                    <div className="ml-5 mt-3">
                        <input type="checkbox" name="indirect light" id="indirect" className=" mr-2 accent-mintGreen" />
                        <label htmlFor="indirect" className="">Indirect</label>
                    </div>

                    <div className="ml-5 mb-3">
                        <input type="checkbox" name="direct light" id="direct" className=" mr-2 accent-mintGreen" />
                        <label htmlFor="direct">Direct</label>
                    </div>

                </details>

                <details name="filter">
                    <summary className="py-2 bg-mintGreen hover:brightness-75 transition-[filter] duration-500">Location</summary>

                    <div className="ml-5 mt-3">
                        <input type="checkbox" name="indoor" id="indoor" className=" mr-2 accent-mintGreen" />
                        <label htmlFor="indoor" className="">Indoor</label>
                    </div>

                    <div className="ml-5 mb-3  ">
                        <input type="checkbox" name="outdoor" id="outdoor" className=" mr-2 accent-mintGreen" />
                        <label htmlFor="outdoor">Outdoor</label>
                    </div>
                </details>

                <details name="filter">
                    <summary className="py-2 bg-mintGreen hover:brightness-75 transition-[filter] duration-500 ">Type</summary>

                    <div className="ml-5 mt-3">
                        <input type="checkbox" name="citrus" id="citrus" className=" mr-2 accent-mintGreen" />
                        <label htmlFor="citrus" className="">Citrus</label>
                    </div>

                    <div className="ml-5   ">
                        <input type="checkbox" name="tropical" id="tropical" className=" mr-2 accent-mintGreen" />
                        <label htmlFor="tropical">Tropical</label>
                    </div>
                    <div className="ml-5 mb-3">
                        <input type="checkbox" name="succulent" id="succulent" className=" mr-2 accent-mintGreen" />
                        <label htmlFor="succulent" className="">Succulent</label>
                    </div>



                </details>

                {/* Sort Selection */}
                <div className="flex flex-row bg-mintGreen py-2">
                    <label htmlFor="sortBy" className="inline-block ">Sort By:</label>
                    <select name="sortBy" id="sortBy" className="inline-block ml-auto">
                        <option value="featured">Featured</option>
                        <option value="priceLow">Price: lowest first</option>
                        <option value="priceHigh">Price: highest first</option>
                        <option value="newest">Date: newest first</option>
                        <option value="oldest">Date: oldest first</option>
                    </select>
                </div>

                <button type="submit" disabled={isPending} className="p-2 mt-auto self-center font-bold rounded-full border-mintGreen  disabled:brightness-75 border-4   hover:bg-mintGreen    ">Apply Changes</button>




            </form>
        </>

    )
}