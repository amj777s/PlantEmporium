import 'server-only';
import { cache } from "react";
import prisma from "@/prisma";
import { FilterOptions, SortBy } from "./types";
import { Prisma } from "@prisma/client";

//TODO: potentially use nextjs cache function for products as react cache is per one user while next cache is for multiple users


const productTake: number = 10; //amount of product to show for each show more product request

//-----------PRODUCT FUNCTIONS----------------

/**
 *  Used to fetch the plant products
 * @param page number used to denote what page of products, used for pagination
 * @returns an array of PlantProduct
 */
export const getProducts = cache(async (page: number) => {

    const skip: number = productTake * page || 0;

    const products = await prisma.plantProduct.findMany({
        skip: skip,
        take: productTake

    });

    return products;
});


/**
 * Finds the total amount of Plant Products in the db
 * @returns the number of plant products
 */
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
    const filterList: string[] = [];

    for (const filterOption in options) {
        if (filterChoices.includes(filterOption)) {
            filterList.push(filterOption);
        }
    };


    return await prisma.plantProduct.findMany({
        orderBy,
        where: {
            types: {
                hasEvery: filterList
            }
        }
    });

});

/**
 * finds the Plant Product associated with the provided product url
 * @param productUrl string of the desired Plant Product
 * @returns A Plant Product or null if not found
 */
export const GetProduct = cache(async (productUrl: string) => {
    return await prisma.plantProduct.findFirst({
        where: {
            urlName: productUrl
        }
    });
});

/**
 * finds Plant Products containing similar tags to the array of tags providied
 * @param productTags a string array of product tags
 * @returns  A PlantProduct[] containing similar products 
 */
export const getRelatedProducts = async (productTags: string[]) => {
    
    const relatedProducts = await prisma.plantProduct.findMany({
        take: 5,
        where: {
            types: {
                hasSome: productTags
            }
        },   
    });

    return relatedProducts;
};


//--------REVIEW FUNCTIONS-------------------

/**
 * Finds the average customer review rating of the product
 * @param productId id of the product
 * @returns A float of the average product rating
 */
export const GetAverageRating = cache(async (productId: number)=> {
    
    const averageRating = await prisma.plantReview.aggregate({
        _avg: {
            rating: true
        },
        
        where: {
            plantId: productId
        }
    });

    if(averageRating._avg.rating){
        return averageRating._avg.rating;
    }else{
        return 0;
    }
   
});


/**
 * Finds the reviews of the given product id
 * @param productId id of product
 * @returns  PlantReview array
 */
export const GetReviews = cache(async (productId: number) => {

    const reviews = await prisma.plantReview.findMany({
        where: {
            plantId: productId
        },
        include: {
            user: {
                select: {
                    name: true
                }
            }
        }

    });

    return reviews;
});

/**
 * Checks whether or not a user has purchased the correspoinding product
 * @param productId id of the product to be reviewed
 * @param user_id id of the user who wants to leave a review
 * @returns a boolean if the user has purchased the product or not
 */
export const verifyPurchase = cache(async (productId: number, userId: string): Promise<boolean> => {

    // Returns the first purchase order that contains an OrderItem with the correct productId
    const verifiedPurchase = await prisma.plantOrder.findFirst({
        where: {
            userId: userId,
            orderItems: {
                some: {
                    productId: productId
                }
            }
        },

    });

    if (verifiedPurchase) {
        return true;
    } else {
        return false;
    }

});

// returns true if user has a review for supplied product number
export const checkForReview = cache(async (productId: number, userId: string) => {
    const userReview = await prisma.plantReview.findFirst({
        where: {
            userId: userId,
            plantId: productId
        }
    });

    if (userReview) {
        return true;
    } else {
        return false;
    }
});

/**
 * Inserts the created review into the PlantReview table
 * @param title The review title
 * @param rating the review rating
 * @param review  the review itself
 * @param productId the id of the product being reviewed
 * @param userId the id of the user leaving the review
 * @returns void
 */
export const createReview = async (title: string, rating: number, review: string, productId: number, userId: string) => {
    await prisma.plantReview.create({
        data: {
            title: title,
            userId: userId,
            plantId: productId,
            rating: rating,
            comment: review
        }
    });
};

//------------CART FUNCTIONS-------------------

// dont cache function. user might remove and then add back item in cart
/**
 * Checks if the user has the provided product in their Shopping Cart
 * @param productId the id of the product 
 * @param userId the id of the user
 * @returns a boolean indicating whether or not if the product is in the user's cart.
 */
export const isItemInCart = async (productId: number, userId: string) => {
    const cartItems = await prisma.shoppingCart.findFirst({

        where: {
            user_id: userId
        },

        select: {
            items: true
        }

    });


    // User doesnt have any items in shopping cart
    if (cartItems === null) {
        return false;
    };

    // check if item is among those in users ShoppingCart items[]
    const isInCart: boolean = cartItems.items.some(item => item.productId === productId);

    if(isInCart){
        return true;
    }else{
        return false; // Returns false because the forEach array has checked the shopping carts item array for the productId and hasnt found it
    }
    
  

};


/**
 * Updates CartItem to the sum of the current CartItem Quantity + the supplied quantity parameter
 * @param productId the id of the product to be updated
 * @param userId the id of the user
 * @param additionalQuantitiy the additional number of products to add 
 * @returns updated CartItem if successful to be used in toast or undefined for error handling in action
 */
export const updateCartItem = async (productId: number, userId: string, additionalQuantitiy: number) => {

    const shoppingCartId = await prisma.shoppingCart.findFirst({
        where: {
            user_id: userId
        },
        select: {
            id: true
        }
    });

    // Make sure the user has a shopping cart
    if (shoppingCartId?.id) {

        const updatedCartItem = await prisma.cartItem.update({
            where: {
                cartId_productId: {
                    cartId: shoppingCartId.id,
                    productId: productId
                }
            },
            data: {
                quantity: {
                    increment: additionalQuantitiy
                }
            }
        });

        return updatedCartItem;

    } else {
        return undefined;
    }
};

// 
/**
 * Creates new cartItem and adds it to the CartItem table
 * @param productId he id of the product to be added to the cart
 * @param userId the id of the user 
 * @param quantity the amount of the product to add to the cart
 * @returns the newly created cartItem or undefined
 */
export const addCartItem = async (productId: number, userId: string, quantity: number) => {

    // Finds users shopping cart id
    const shoppingCartId = await prisma.shoppingCart.findFirst({
        where: {
            user_id: userId
        },
        select: {
            id: true
        }
    });


    if (shoppingCartId) {
        // Create new cartItem
        const addedCartItem = await prisma.cartItem.create({
            data: {
                cartId: shoppingCartId?.id,
                productId: productId,
                quantity: quantity
            }
        });

        return addedCartItem;
    } else {
        // undefined to be returned for error handling if somehting goes wrong with create
        return undefined;
    }


};




