import { faqs } from "@/src/data";
import ArrowDown from "@/public/icons/keyArrowDown.svg";

export default function FAQPage() {
    return (
        <main className="flex flex-col  w-full  mb-3 mx-auto p-[--mobile-padding] sm:px-[--small-padding] xl:px-[--xl-padding] 2xl:px-[--2xl-padding] 3xl:px-[--3xl-padding]  " >
            <p className=" italic font-bold text-slate-400">FAQ</p>
            <h1 className=" mb-14 font-bold text-4xl">Answers Await.</h1>
            <h2 className=" mb-8 font-bold text-xl">Common Questions</h2>

            {/* Questions and anwsers */}
            <section className="w-full flex flex-col first:border-t-2">
                {Object.entries(faqs).map(([question, answer]) => {
                    return (
                        <details key={question} name="faqs" className="w-full py-3 border-y-[1px] border-slate-200 group">
                            <summary className="w-full list-none flex flex-row items-center justify-between hover:bg-slate-100 transition-colors duration-300 ">
                                <p className="shrink font-semibold mb-3">{question}</p>
                                <ArrowDown className="size-6 shrink-0 grow-0 fill-mintGreen group-open:rotate-180 transition-all duration-200" />
                            </summary>
                            <p>{answer}</p>
                        </details>
                    )
                })}
            </section>
        </main>
    )
}