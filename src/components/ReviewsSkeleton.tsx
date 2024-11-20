export default function ReviewsSkeleton() {

    // Make sure height is equal to comment p in Review
    return (
        <div className="w-full flex flex-col gap-5">
            <p className="font-extrabold text-lg">Reviews</p>
            <div className="w-full p-3  bg-mintGreen rounded-lg">
                <div className=" animate-pulse w-full flex flex-col gap-4">
                    <div className="h-4 w-1/3  bg-slate-700 rounded-full"></div>
                    <div className="h-4 w-1/3  bg-slate-700 rounded-full"></div>
                    <div className="h-52 flex flex-col gap-3">
                        <div className="h-4 w-full bg-slate-700 rounded-full"></div>
                        <div className="h-4 w-full bg-slate-700 rounded-full"></div>
                        <div className="h-4 w-full bg-slate-700 rounded-full"></div>
                        <div className="h-4 w-full bg-slate-700 rounded-full"></div>
                        <div className="h-4 w-full bg-slate-700 rounded-full"></div>
                        <div className="h-4 w-full bg-slate-700 rounded-full"></div>
                        <div className="h-4 w-1/2 bg-slate-700 rounded-full"></div>
                    </div>

                </div>
            </div>
        </div>
    );
}