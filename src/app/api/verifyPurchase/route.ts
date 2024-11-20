
import { auth } from "@/auth";
import { verifyPurchase } from "@/src/utils";


export async function POST(request: Request) {
    const session = await auth();
    const { productId } = await request.json();

    if (!session) {

        return Response.json({
            message: "Must Be Logged In.",
            reason: "validation"
        }, {
            status: 403
        });
    }

    const isPurchaseVerified = await verifyPurchase(productId, session.user!.id!); //null override since a session will always have a user attached to it

    if (isPurchaseVerified) {
        return Response.json({
            message: "User and purchase verified.",
            reason: "verified"
        }, {
            status: 200
        });
    } else {
        return Response.json({
            message: "Must have purchased Item",
            reason: "purchase"
        }, {
            status: 403
        });
    }
    
    

};