import { signOUT, sendToSignIn } from "@/src/actions/actions";
import { auth } from "@/auth";

export default async function DashBoard() {

    const session = await auth();
    if (!session) {
        return (<>
          <p>Not Authorized...</p>
          <form action={sendToSignIn}>
           <button type="submit">Go to sign In</button>
          </form>
        </>
        );

    }

    return (
        <div>
            <p>{JSON.stringify(session)}</p>
            <form action={signOUT}>
                <button type="submit">Sign Out</button>
            </form>
        </div>
    );
}