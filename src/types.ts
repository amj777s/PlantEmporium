import { PlantReview } from "@prisma/client";

export enum SortBy {
    Featured = "featured",
    PriceLow = "priceLow",
    PriceHigh = "priceHigh",
    Newest = "newest",
    Oldest = "oldest"
};

export type FilterOptions = {
    page?: string
    indirect?: string,
    direct?: string,
    indoor?: string,
    outdoor?: string,
    citrus?: string,
    tropical?: string,
    succulent?: string,
    sortBy?: SortBy
};

export type FormMessage = {
    error: boolean,
    message: string
}

export type ReviewFormData = FormMessage & {
    data: {
        title: string,
        rating: number,
        review: string
    };
}

export type  PlantReviewWithUser = PlantReview & {
    user: {
        name: string | null
    } | null
};

