import {z} from "zod";


export const ReviewSchema = z.object({
    title: z.string().trim().min(1, "Must have a Title").max(40, "Title can not exceed 40 characters."),
    rating: z.number().min(1, "Rating must have at least 1 star.").max(5, "Rating must not exceed 5 stars").step(1).int("Must be a an integer.").positive("must be a positive number"),
    review: z.string().trim().min(1, "Review cannot be empty.").max(2000,"Review cannot exceed 2000 characters." )
});

//returns zod schema with itemStock as max amount
export const ProductQuantitySchema = (itemStock: number)=> {
    return z.number().min(1, "Must add at least 1 item to cart").max(itemStock, `Only ${itemStock} left in stock.`);
};

