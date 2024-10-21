

import { cache } from "react";
import prisma from "@/prisma";
import { FilterOptions, SortBy } from "./types";
import { Prisma } from "@prisma/client";

const productTake: number = 10 //amount of product to show for each show more product request

export const getProducts = cache(async (page: number) => {

    const skip: number = productTake * page || 0;

    const products = await prisma.plantProduct.findMany({
        skip: skip,
        take: productTake

    });

    return products;
})

export const getProductTotal = cache(async () => {
    return await prisma.plantProduct.count();
});

/**
 * @param options the associated filter options for the products list
 * @returns a product array given the applied filters and sort options
 */
export const getFilteredProducts = cache(async (options: FilterOptions) => {

    let orderBy;

    switch (options.sortBy) {

        // Featured currently just grabs the relavant data in no particular order
        case SortBy.Featured:
            orderBy = {
                id: "asc"
            } satisfies Prisma.PlantProductOrderByWithRelationInput;

            break;

        case SortBy.Newest:
            orderBy = {
                createdAt: "asc"
            } satisfies Prisma.PlantProductOrderByWithRelationInput;
            break;

        case SortBy.Oldest:
            orderBy = {
                createdAt: "desc"
            } satisfies Prisma.PlantProductOrderByWithRelationInput;

            break;

        case SortBy.PriceHigh:
            orderBy = {
                price: "desc"
            } satisfies Prisma.PlantProductOrderByWithRelationInput;

            break;
        case SortBy.PriceLow:
            orderBy = {
                price: "asc"
            } satisfies Prisma.PlantProductOrderByWithRelationInput;

            break;

        default:
            break;
    }

    // Filter out all the unselected options 
    const filterChoices: string[] = ["direct light", "indirect light", "indoor", "outdoor", "tropical", "succulent", "citrus"];
    let filterList: string[] = [];

    for (const filterOption in options) {
        if (filterChoices.includes(filterOption)) {
            filterList.push(filterOption);
        }
    };


    console.log(`the filters are ${filterList}`);

    return await prisma.plantProduct.findMany({
        orderBy,
        where: {
            types: {
                hasEvery: filterList
            }
        }
    });

});

//TODO fix filter list to return key name instead of value name in filters
// Check to make sure that if no filters are selected, that the blank filter array still returns everything


