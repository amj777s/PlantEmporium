//TODO  update User table and add plantusername row and allowing optoin to change name/ user pic

'use client';

import StarEmpty from '@/public/icons/star.svg';
import StarFilled from '@/public/icons/starFilled.svg';
import ArrowDown from '@/public/icons/keyArrowDown.svg';
import { useState } from "react";
import { PlantReviewWithUser } from '../types';

export default function Review({
    review
}: {
    review: PlantReviewWithUser
    
}) {

    const [reviewHidden, toggleReview] = useState<boolean>(true);

    const stars = [];
    const numEmptyStars: number = 5 - review.rating; // Used to calculate number of empty stars to push into stars array
    const reviewHeight: string = reviewHidden ? 'max-h-52' : 'max-h-[1500px]'; //Used for controlling height of review comment; max-height used since h-auto wasnt transitionable
    const arrowRotation: string = reviewHidden ? 'rotate-0' : 'rotate-180'; // Used for the orientation of the review show more arrow
    const lineBlur:string = reviewHidden ? 'backdrop-blur-[1px]' : "backdrop-blur-none"; //Used for bluring bottom lines of review when minimized


    // Add filled stars into stars array
    for (let index = 0; index < review.rating; index++) {
        stars.push(
            <StarFilled key={review.title + "star" + index} alt="star" className=" size-5 fill-black" /> //upate key, different users could make the same title with same rating;

        );

    }

    // Push empty stars into stars array if the rating is not 5 stars
    if (numEmptyStars) {
        for (let index = 0; index < numEmptyStars; index++) {
            stars.push(
                <StarEmpty key={review.title + "emptystar" +index} alt="star" className=" size-5 fill-black" />
            );

        }
    }



    return (
        <article className=" w-max-[500px] w-full sm:w-3/4 lg:w-1/2 flex flex-col gap-2 p-3   bg-mintGreen rounded-lg">
            <h4 className="font-bold">{review.title}</h4>
            {/* Stars */}
            <div className="w-full flex flex-row justify-start items-center ">
                {stars}
            </div>
            
            {/* Comment with blur line*/}
            <div className={` relative overflow-hidden transition-[max-height] duration-700 ${reviewHeight}`}>
                <p>{review.comment}</p>

                {/* Change to User.plantUserName */}
                <p className='self-start text-sm'>-{review.user?.name ?? 'deleted'} <time className='text-sm'>{review.createdAt.toLocaleDateString()}</time></p>
                <div className={`absolute z-10 w-full h-8 bottom-0 transition-all duration-1000 ${lineBlur} `}></div>
            </div>
            {/*Review Expansion Arrow */}
            <button className="size-5 self-end" onClick={() => toggleReview(!reviewHidden)}>
                <ArrowDown className={`fill-black transition-all duration-300 ${arrowRotation}`} />
            </button>
        </article>
    );
}