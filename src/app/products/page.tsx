
import ProductCard from "@/src/components/ProductCard";
import ProductSkeleton from "@/src/components/ProductSkeleton";
import { getProducts } from "@/src/utils";
import { Suspense } from "react";

export const revalidate = 3600;

export default async function ProductsPage() {
    
    const products = await getProducts(); //rember to include other relatioships like reviews
   
    return (

        <main className=" flex flex-wrap gap-4  w-full justify-center">
            {products.map(product => {
                return (
                    <Suspense key={"suspense" +product.id} fallback={<ProductSkeleton />}>
                        <ProductCard key={product.id} product={product} />
                    </Suspense>
                    
                )
            })}
        </main>

    )



}