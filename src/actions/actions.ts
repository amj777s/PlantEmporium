'use server';

//TODO: provide method for add to cart that adds item to ItemCart table, provided the user exists, otherwise add to guest shopping cart in localStorage

import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { FormMessage, ReviewFormData } from "@/src/types";
import { ReviewSchema, ProductQuantitySchema } from "../zodSchemas";
import { ZodError } from "zod";
import {addCartItem,updateCartItem,checkForReview, createReview, isItemInCart, verifyPurchase } from "../utils";


//
export const signIN = async (provider: string, callbackUrl: string | undefined) => {
    
    await signIn(provider,{redirectTo: callbackUrl});
};

export const signOUT = async () => {
    await signOut({ redirectTo: '/' });
};

export const sendToSignIn = async () => {
    redirect('/');
};

/**
 * Adds the item and its quantity to the CartItem db table if the user is logged in, otherwise adds to guest shopping cart in localStorage
 * 
 * @param productId value binded from  AddtoCart 
 * @param itemStock value bindned from AddtoCart
 * @param currentState the current form state, with initial value created in useActionState
 * @param formData the data in the form
 * 
 * @returns an object containing an error property  and a message property for toast
 */
export const AddInCart = async (productId: number, itemStock: number, currentState: FormMessage, formData: FormData) => {


    const QuantitySchema = ProductQuantitySchema(itemStock);

    const quantity: number = Number(formData.get('amount'));
    let parsedQuantity: number;

    try {
        parsedQuantity = QuantitySchema.parse(quantity);

    } catch (error) {
        if (error instanceof ZodError) {
            return {
                error: true,
                message: error.issues[0].message
            };
        } else {
            console.error("Unexpected error ", error);
            return {
                error: true,
                message: "Something went wrong. Try Again."
            };
        }
    };

    const session = await auth();

    if (session?.user?.id) {
        const userId = session.user.id; //null override used since a session will always have a user attached
        const hasItemInCart: boolean = await isItemInCart(productId, userId);

        if (hasItemInCart) {

            await updateCartItem(productId, userId, parsedQuantity); // possibly used for detailed toast

        } else {
            await addCartItem(productId, userId, parsedQuantity); // possibly used for detailed toast
        }

        return {
            error: false,
            message: "Added To Cart!"

        };

    }

    //insert logic for guest users 
    // returning error, user must be signed in to add to cart for now
    return {
        error: true,
        message: "Must be signed in to add to cart!"
    };

};

/**
 * action handling form submission for user submitted review.Checks to make sure user is verified and has purchased
 * product before adding review to PlantReview table
 * @param productId the id associated with the product being reviewed
 * @param currentState the state of the form
 * @param formData the data provided to the form
 * @returns the currentState of the form
 */
export const addReview = async (productId: number, currentState: ReviewFormData, formData: FormData) => {


    let title: string;
    let review: string;
    let rating: number;

    try {

        ({ title, review, rating } = ReviewSchema.parse({
            title: formData.get('title')?.toString(),
            review: formData.get('title')?.toString(),
            rating: Number(formData.get('rating'))
        }));

    } catch (error) {

        if (error instanceof ZodError) {
            return {
                error: true,
                message: error.issues[0].message,
                data: {
                    title: formData.get('title'),
                    review: formData.get('review'),
                    rating: Number(formData.get('rating'))

                }
            } as ReviewFormData;
        } else {
            console.error("Unexpected error ", error);
            return {
                error: true,
                message: "Something went wrong. Try Again.",
                data: {
                    title: formData.get('title'),
                    review: formData.get('review'),
                    rating: Number(formData.get('rating'))

                }
            } as ReviewFormData;
        }

    }

    const session = await auth();

    // Makes sure user is logged in 
    if (!session) {
        return {
            error: true,
            message: "Must be logged in to write a review",
            data: {
                title: formData.get('title'),
                review: formData.get('review'),
                rating: Number(formData.get('rating'))

            }
        } as ReviewFormData;
        
    }

    const userId = session.user?.id!; //null override used since a session will always have a user attached

    // Returns the first purchase order that contains an OrderItem with the correct productId
    const isPurchasVerified = await verifyPurchase(productId, userId);

    if (!isPurchasVerified) {
        return {
            error: true, 
            message: "Must have purchased product to write a review.",
            data: {
                title: formData.get('title'),
                review: formData.get('review'),
                rating: Number(formData.get('rating'))

            }
        } as ReviewFormData;
    };

    // returns a boolean indictaing whether or not the user has already written a review for the product
    const hasWrittenReview: boolean = await checkForReview(productId, userId);

    if (hasWrittenReview) {
        return {
            error: true, 
            message: "Already wrote a review for this product. May not write another.",
            data: {
                title: formData.get('title'),
                review: formData.get('review'),
                rating: Number(formData.get('rating'))

            }
        } as ReviewFormData;
    };


    await createReview(title, rating, review, productId, userId);

    return {
        error: false, 
        message: "Review Created!",
        data:{
            title: '',
            review: '',
            rating: 5

        }
    } as ReviewFormData;

};




//TODO: 
// handle guest logic
// handle logic for updating inventory in PlantProduct table
// error handling