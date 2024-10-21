//TODO: get caching to work
//Remove product skeleton, as image loading from cloudinary doesnt trigger suspense

import ProductCard from "@/src/components/ProductCard";
import ProductSkeleton from "@/src/components/ProductSkeleton";
import { getFilteredProducts, getProducts, getProductTotal } from "@/src/utils";
import { Suspense } from "react";
import { PlantProduct } from "@prisma/client";
import ShowMoreButton from "@/src/components/ShowMoreButton";
import FilterList from "@/src/components/FilterList";
import { FilterOptions } from "@/src/types";


export const revalidate = 3600; //Check for new proucts every hour

export default async function ProductsPage({
    searchParams
}: {
    searchParams: FilterOptions
}) {

    let products: PlantProduct[] = []; // ! before variable tells typescript to remove undefined or null as possibles types for variable:
    let productEndFlag: boolean = false;
    let productTotal: number;

    // messes up because search params are still there when going back a page 
    if (Object.keys(searchParams).length >= 1) {

        // Used just for pagination of products
        if (searchParams.page) {
            // since getProducts(page) should be cached for each success page, shouldnt have to make repeated calls to db
            productTotal = await getProductTotal();
            for (let i = 0; i <= Number(searchParams?.page); i++) {

                const someProducts = await getProducts(i);
                products.push(...someProducts);

                // Used to hide the ShowMoreButton Component when there are no more products in the db.

                if (i === Number(searchParams?.page)) {

                    if (products.length === productTotal) {

                        productEndFlag = true;

                    }

                }
            }

            // Used for filtered results
        } else {
            products = await getFilteredProducts(searchParams);
            productTotal = products.length;
            productEndFlag = true;
        }


    } else {
        // Used for fetching inital /products  endroute
        
        [productTotal, products] = await Promise.all([getProductTotal(), getProducts(0)]);

    }



    return (

        <main className=" flex flex-col gap-4 mb-3 px-3  w-full items-center justify-center">

            {/* Header */}
            <h1 className=" self-start font-bold text-2xl">Products</h1>
            <p className=" font-medium text-sm">Our plants are sourced from environmentally friendly nurseries around the world and arrive at your door step healthy and happy.
                Guaranteed to please!
            </p>
            <hr className=" h-[1px] w-full "></hr>
            {/* Filter */}
            <FilterList productTotal={productTotal} />
            <hr className=" h-[1px] w-full "></hr>
            {/* Products */}
            {products.map(product => {
                return (
                    <Suspense key={"suspense" + product.id} fallback={<ProductSkeleton />}>
                        <ProductCard key={product.id} product={product} />
                    </Suspense>

                );
            })}

            {!productEndFlag && <ShowMoreButton />}
        </main>

    );



}

