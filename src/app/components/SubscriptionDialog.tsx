"use client";

import { useEffect, useRef, useState } from "react";
import { usePremiumPayment } from "@/app/hooks/usePremiumPayment";
import { useSubscriptionDialog } from "@/app/hooks/useSubscriptionDialog";

export default function SubscriptionDialog() {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const { setSubscriptionDialogRef } = useSubscriptionDialog();
    const [plan, setPlan] = useState<"monthly" | "weekly">("monthly");
    const { initiatePayment, isLoading } = usePremiumPayment();

    useEffect(() => {
        setSubscriptionDialogRef(dialogRef.current);
    }, [setSubscriptionDialogRef]);

    return (
        <dialog ref={dialogRef} className="modal">
            <div className="modal-box max-w-md p-0 rounded-box overflow-hidden">
                <div className="card rounded-box bg-base-100 card-border border-base-300 from-base-content/5 bg-linear-to-bl to-50%">
                    <div className="flex justify-center">
                        <div className="tabs tabs-box bg-base-300 m-4 inline-flex flex-nowrap">
                            <input
                                type="radio"
                                name="my_tabs_1"
                                role="tab"
                                className="tab w-full"
                                aria-label="Неділя"
                                checked={plan === "weekly"}
                                onChange={() => setPlan("weekly")}
                            />
                            <input
                                type="radio"
                                name="my_tabs_1"
                                role="tab"
                                className="tab w-1/2"
                                aria-label="Місяць"
                                checked={plan === "monthly"}
                                onChange={() => setPlan("monthly")}
                            />
                            <div className="indicator w-1/2">
                                <div className="indicator-item badge badge-warning badge-xs">
                                    Знижка
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card-body gap-4">
                        <div className="flex flex-col">
                            <h4 className="font-bold tracking-wide opacity-50">
                                Преміум доступ
                            </h4>
                            <div>
                                {plan !== "monthly" ? (
                                    <>
                                        <span className="text-4xl font-black">49₴</span>
                                        <span className="opacity-50">/week</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-4xl font-black">99₴</span>
                                        <span className="opacity-50">/month</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="my-2 flex flex-col text-xs">
                            <div className="border-b-accent/5 flex items-center gap-2 border-b pb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-success size-4" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
                                </svg>
                                200 кредитів ШІ на день
                            </div>
                            <div className="border-b-accent/5 flex items-center gap-2 border-b pb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-success size-4" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
                                </svg>
                                Повний доступ до тестів
                            </div>
                            <div className="border-b-accent/5 flex items-center gap-2 border-b pb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-success size-4" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clipRule="evenodd" />
                                </svg>
                                Пріоритетна підтримка
                            </div>
                        </div>

                        <button
                            className="btn btn-accent"
                            onClick={() =>
                                initiatePayment(plan === "monthly" ? "monthly" : "week")
                            }
                            disabled={isLoading}
                        >
                            {isLoading ? "Обробка..." : "Оформити"}
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button className="btn btn-sm btn-circle absolute right-2 top-2">
                        ✕
                    </button>
                </form>
            </div>
        </dialog>
    );
}
