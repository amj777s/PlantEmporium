"use client";

import { PlantProduct } from "@prisma/client";
import { use } from "react";
import ProductCard from "./ProductCard";

export default function RelatedProductsList({
    relatedProductsPromise
}: {
    relatedProductsPromise: Promise<PlantProduct[]>
}) {

    const relatedProducts = use(relatedProductsPromise);
    


    // Dont show related products section if relatedproducts array is empty
    if(relatedProducts.length === 0){
        return <></>;
    }

   const  mobileFlexPositioning = relatedProducts.length === 1 ? 'justify-center' : " "; 




    return (
        <section className="w-full mb-10">
            <p className="font-extrabold text-xl">Related Products</p>
            <div className={`related-products-scroll w-full snap-mandatory snap-x overflow-x-auto   py-5 flex flex-row ${mobileFlexPositioning} sm:justify-start gap-10 first:text-teal-200`}>
                {relatedProducts.map(product => {
                    return (
                        <ProductCard key={`related ${product.imageUrl}`} product={product} />
                    );
                })}
            </div>
            
           

        </section>
    );
}

//TODO loading skeleton, css scroll animatio for carasoul, fix margins on scroll