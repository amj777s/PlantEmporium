"use client";

import { CldImage } from "next-cloudinary";

export default function CldImageWrapper({
    imageUrl,
    displayName
}: {
    imageUrl: string,
    displayName: string
}) {
    return (

        <CldImage
            width={0}  //work around for non static images 
            height={0}
            alt={displayName}
            sizes="100vw"  // create media queries for correct serving of sizes
            className=" w-full object-contain mb-2"
            src={imageUrl}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMyMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3QgIHg9IjAiIHk9IjAiIHdpZHRoPSIzMjAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZWVlIiAvPgogIDxyZWN0IHg9IjgwIiB5PSI2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZGRkIiAvPgogIDxyZWN0IHg9IjEyMCIgeT0iODAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNkZGRkIiAvPgo8L3N2Zz4K"
            loading="lazy"
        />
    );
};