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
// look into using next unstable_cache for getProducts, getProductTotal, getFilteredProducts
// like React cache  it deduplicates requests, but instead applies to it to all client, instead of individually like React.cache
// example on ISR page in Nextjs
export const revalidate = 3600; //Check for new proucts every hour

export default async function ProductsPage(
    props: {
        searchParams: Promise<FilterOptions>
    }
) {
    const searchParams = await props.searchParams;

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

        <main className=" flex flex-col w-full gap-4 mb-3 p-[--mobile-padding] sm:px-[--small-padding] 2xl:px-[--2xl-padding]  items-center justify-center">

            {/* Header */}
            <h1 className=" self-start font-bold text-2xl">Products</h1>
            <p className=" font-medium text-sm">Our plants are sourced from environmentally friendly nurseries around the world and arrive at your door step healthy and happy.
                Guaranteed to please!
            </p>
            <hr className=" h-[1px] w-full "></hr>

            <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-0">
                {/* Filter */}
                <FilterList productTotal={productTotal} />
                <hr className=" h-[1px] w-full sm:hidden "></hr>
                {/* Products */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap sm:w-3/4 sm:justify-around items-center gap-3 sm:gap-8">
                    {products.map(product => {
                        return (
                            <Suspense key={"suspense" + product.id} fallback={<ProductSkeleton />}>
                                <ProductCard key={product.id} product={product} />
                            </Suspense>

                        );
                    })}

                     {!productEndFlag && <ShowMoreButton />}
                </div>
                
               
            </div>

        </main>

    );
}

