import { GetReviews, GetProduct, GetAverageRating, getRelatedProducts } from "@/src/utils";
import Link from "next/link";
import CldImageWrapper from "@/src/components/CldImageWrapper";
import AddToCart from "@/src/components/AddToCart";
import RelatedProductsList from "@/src/components/RelatedProductsList";
import ReviewList from "@/src/components/ReviewList";
import ReviewsSkeleton from "@/src/components/ReviewsSkeleton";
import { Suspense } from "react";

export default async function ProductPage(
    props: {
        params: Promise<{ product: string }>
    }
) {
    const params = await props.params;
    const productInfo = await GetProduct(params.product);

    if (productInfo) {

        // Allows for promise to resolve on the client.Dont have to wait for review section finsh loading to show page
        const reviewsPromise = GetReviews(productInfo.id);
        const averageRatingPromise = GetAverageRating(productInfo.id);
        const relatedProductsPromise = getRelatedProducts(productInfo.types);

        return (
            <main className=" flex flex-col w-full  mb-3 mx-auto p-[--mobile-padding] sm:px-[--small-padding] xl:px-[--xl-padding] 2xl:px-[--2xl-padding] 3xl:px-[--3xl-padding]  items-center  ">

                {/* Breadcrumbs */}
                <ol className=" w-full mb-2 flex flex-row items-center gap-2 text-sm font-semibold">
                    <li className=" after:content-['/'] after:ml-2 text-gray-400"><Link href="/home">Home</Link></li>
                    {/* Potentially turn off prefetch for products route */}
                    <li className="after:content-['/'] after:ml-2 text-gray-400"><Link href="/products">Products</Link></li>
                    <li><Link href="#">{productInfo?.displayName}</Link></li>
                </ol>
                <div className="w-full mb-10 flex flex-row flex-wrap justify-between">
                    <div className=" max-w-lg w-full sm:w-2/5">
                        <CldImageWrapper imageUrl={productInfo.imageUrl} displayName={productInfo.displayName} />
                        <h2 className=" font-extrabold ">{productInfo.displayName}</h2>
                        <span className="font-extrabold ">{`$${productInfo.price}`}</span>
                        {/* Cart Item Button */}
                       
                        <AddToCart productId={productInfo.id} itemStock={productInfo.inventory} />
                    </div>

                    <div className="w-full sm:w-1/2 max-w-lg">

                    
                        {/* Product Description */}
                        <p className="mb-8">{productInfo.description}</p>

                        {/* Key Facts */}
                        <ul className="w-full">
                            {productInfo.keyPoints.map((point, i) => {
                                const [boldheader, sentence] = point.split(":");

                                return (

                                    <li key={i} className=" w-full flex flex-row items-start mb-3 ">
                                        <svg className=" fill-mintGreen mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#5f6368"><path d="M342-160h276l40-160H302l40 160Zm0 80q-28 0-49-17t-28-44l-45-179h520l-45 179q-7 27-28 44t-49 17H342ZM200-400h560v-80H200v80Zm280-240q0-100 70-170t170-70q0 90-57 156t-143 80v84h320v160q0 33-23.5 56.5T760-320H200q-33 0-56.5-23.5T120-400v-160h320v-84q-86-14-143-80t-57-156q100 0 170 70t70 170Z" /></svg>
                                        <p className="w-[90%] shrink-0 font-semibold"><b>{`${boldheader}:`}</b>{sentence}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* Section of related products by tag type*/}
                <Suspense fallback={<p>loading related products...</p>}>
                    <RelatedProductsList relatedProductsPromise = {relatedProductsPromise} />
                </Suspense>
                
               
                {/* Reviews */}
                <Suspense fallback={<ReviewsSkeleton />}>
                    <ReviewList reviewsPromise={reviewsPromise} ratingPromise={averageRatingPromise} productId={productInfo.id} />
                </Suspense>

            </main>
        );
    }
}

//TODO Create react error boundary for products that are removed from table but people still visit page