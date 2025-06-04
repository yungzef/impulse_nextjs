import { useState, useRef } from "react";

export default function SubscriptionDialog() {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const [plan, setPlan] = useState<"monthly" | "yearly">("yearly");

    const openDialog = () => dialogRef.current?.showModal();

    return (
        <>
            <button onClick={openDialog} className="btn btn-primary">Открыть подписку</button>

            <dialog ref={dialogRef} className="modal">
                <div className="modal-box max-w-md p-0 rounded-lg overflow-hidden">
                    <div className="card bg-base-100 card-border border-base-300 from-base-content/5 bg-linear-to-bl to-50%">
                        <div className="flex justify-center">
                            <div className="tabs tabs-box bg-base-300 m-4 inline-flex flex-nowrap">
                                <input
                                    type="radio"
                                    name="my_tabs_1"
                                    role="tab"
                                    className="tab w-1/2"
                                    aria-label="Monthly"
                                    checked={plan === "monthly"}
                                    onChange={() => setPlan("monthly")}
                                />
                                <input
                                    type="radio"
                                    name="my_tabs_1"
                                    role="tab"
                                    className="tab w-full"
                                    aria-label="Yearly"
                                    checked={plan === "yearly"}
                                    onChange={() => setPlan("yearly")}
                                />
                                <div className="indicator w-1/2">
                                    <div className="indicator-item badge badge-warning badge-xs">SALE</div>
                                </div>
                            </div>
                        </div>

                        <div className="card-body gap-4">
                            <div className="flex flex-col">
                                <h4 className="font-bold tracking-wide opacity-50">Starter Plan</h4>
                                <div>
                                    {plan === "monthly" ? (
                                        <>
                                            <span className="text-4xl font-black">$200</span>
                                            <span className="opacity-50">/month</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-4xl font-black">$1800</span>
                                            <span className="opacity-50">/year</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="my-2 flex flex-col text-xs">
                                <div className="border-b-accent/5 flex items-center gap-2 border-b pb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-success size-4" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
                                    </svg>
                                    {plan === "monthly" ? "20 Tokens per day" : "30 Tokens per day"}
                                </div>

                                <div className="border-b-accent/5 flex items-center gap-2 border-b pb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-success size-4" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
                                    </svg>
                                    {plan === "monthly" ? "10 Projects" : "Unlimited Projects"}
                                </div>

                                <div className="border-b-accent/5 flex items-center gap-2 border-b pb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-success size-4" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
                                    </svg>
                                    API Access
                                </div>

                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-error size-4" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z" clipRule="evenodd" />
                                    </svg>
                                    Priority Support
                                </div>
                            </div>

                            <button className="btn btn-accent">Buy Now</button>
                        </div>
                    </div>

                    <form method="dialog" className="modal-backdrop">
                        <button className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
                    </form>
                </div>
            </dialog>
        </>
    );
}
