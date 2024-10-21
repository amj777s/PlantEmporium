
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