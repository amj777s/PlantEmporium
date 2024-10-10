import {cache} from "react";
import {prisma} from "@/prisma";

export const getProducts = cache(async ()=> {
    const products = await prisma.plantProduct.findMany();
    return products;
})