"use client";
import { PlantReviewWithUser } from "../types";
import Review from "./Review";
import React, { use, useState } from "react";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import NoReviewsIcon from '@/public/icons/reviewEmpty.svg';
import StarEmpty from '@/public/icons/star.svg';
import StarFilled from '@/public/icons/starFilled.svg';
import StarHalf from '@/public/icons/starHalf.svg'



//lazy load reviewModal only if users decide to write a review
const ReviewModal = dynamic(() => import('@/src/components/ReviewModal'), {
    loading: () => <p>Loading Review Form...</p>,
    ssr: false
});

export default function ReviewList({
    reviewsPromise,
    ratingPromise,
    productId
}: {
    reviewsPromise: Promise<PlantReviewWithUser[]>,
    ratingPromise: Promise<number>,
    productId: number
}) {

    const reviews = use(reviewsPromise);
    const averageRating = use(ratingPromise);
    const [isReviewModalVisible, toggleReviewModal] = useState<boolean>(false);
    let stars = [];




    /**
     * checks whether or not a user is currently logged in.
     * Will display a successful toast or error toast with relavent message
     */
    const checkLogin = async (e: React.MouseEvent<HTMLElement>) => {

        e.preventDefault();

        const response = await toast.promise(fetch('/api/verifyPurchase', {
            method: "POST",
            body: JSON.stringify({ productId })
        }), {
            pending: "Checking User is verified and has purchased item",
        });

        const { message, reason } = await response.json();

        if (reason === "validation" || reason === "purchase") {
            toast.error(message, { autoClose: 5000 });
        } else {
            toast.success(message, { autoClose: 3000 });
            toggleReviewModal(!isReviewModalVisible);
        }

    }

    let numWholeStars = Math.floor(averageRating);
    let numEmptyStars;
    let numhalfStars = 0;
    const decimalRating: number = averageRating % 1; //returns the decimal part of the rating
    if (decimalRating <= 0.25) {
        numEmptyStars = 5 - numWholeStars;
    } else if (decimalRating >= 0.75) {
        numWholeStars += 1;
        numEmptyStars = 5 - numWholeStars;
    } else {
        numhalfStars += 1;
        numEmptyStars = 5 - numWholeStars - numhalfStars;
    };

    if (numWholeStars) {
        for (let index = 0; index < numWholeStars; index++) {
            stars.push(<StarFilled key={`average star whole ${index}`} className=" size-5 fill-black" />);

        }
    }

    if (numhalfStars) {
        for (let index = 0; index < numhalfStars; index++) {
            stars.push(<StarHalf key={`average star half ${index}`} className=" size-5 fill-black" />);

        }
    }

    if (numEmptyStars) {
        for (let index = 0; index < numEmptyStars; index++) {
            stars.push(<StarEmpty key={`average star empty ${index}`} className=" size-5 fill-black" />);

        }
    }




    if (reviews.length === 0) {
        return (
            <section className=" relative w-full flex flex-col gap-2">
                <h2 className="font-extrabold text-lg">Reviews</h2>
                <div className=" w-max-[500px] w-full sm:w-3/4 lg:w-1/2 self-center flex flex-row justify-around p-3 gap-3 bg-mintGreen rounded-lg ">
                    <NoReviewsIcon className='size-32 fill-black' />
                    <div className="flex flex-col items-center justify-around">
                        <p className="font-semibold text-lg">No Reviews Found!</p>
                        <button onClick={checkLogin} className="p-2 self-center border-2 border-black hover:bg-green-400 transition-colors duration-500 font-semibold  rounded-full">Leave Review</button>
                    </div>
                </div>

                <ReviewModal productId={productId} isOpen={isReviewModalVisible} closeModal={() => toggleReviewModal(false)} />

            </section>
        );
    }

    return (
        <section className=" relative w-full flex flex-col items-center gap-5">
            <div className="w-full">
                <h2 className="font-extrabold text-xl ">Customer Reviews</h2>
                <div className="flex flex-row justify-start items-center ">
                    {stars}
                    <span className="ml-3 font-semibold">{`${averageRating} out of 5`}</span>
                </div>
                <p className="font-semibold">{`${reviews.length} reviews`}</p>
                <button onClick={checkLogin} className=" p-1 rounded-full border-2 border-mintGreen hover:bg-mintGreen transition-colors duration-500">Leave A Review</button>
            </div>
            {reviews.map(review => <Review key={review.id} review={review} />)}

            <ReviewModal productId={productId} isOpen={isReviewModalVisible} closeModal={() => toggleReviewModal(false)} />

        </section>
    );
}