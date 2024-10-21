"use client" ;
import { CldImage } from "next-cloudinary";
import { PlantProduct } from "@prisma/client";

export default  function ProductCard({
    product
}:{
    product: PlantProduct
}){

    const roundedPrice = Math.floor(product.price);

    return (
            
            <article className=" flex flex-col items-start w-3/4 rounded shadow-lg p-3 bg-cardWhite">
                <div className="w-full relative ">
                <CldImage 
                    width={0}  //work around for non static images 
                    height={0}
                    alt={product.displayName}
                    sizes="100vw"  // media queries for correct serving of sizes
                    className=" w-full object-contain mb-2"
                    src={product.imageUrl}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMyMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3QgIHg9IjAiIHk9IjAiIHdpZHRoPSIzMjAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZWVlIiAvPgogIDxyZWN0IHg9IjgwIiB5PSI2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZGRkIiAvPgogIDxyZWN0IHg9IjEyMCIgeT0iODAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNkZGRkIiAvPgo8L3N2Zz4K"
                    loading="lazy"
                    />
                </div>
                <p className=" font-bold">{product.displayName}</p>
                <p className=" font-semibold">{`$${roundedPrice}`}</p>

            </article>
       
        
    );
}   

//TODO: figure out why nextjs is loading images not in viewport