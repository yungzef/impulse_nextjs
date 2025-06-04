"use client";

import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import Link from "next/link";
import {
    Crown,
    LogOut,
    RefreshCw,
    Settings,
    HelpCircle,
} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {usePremiumPayment} from "@/app/hooks/usePremiumPayment";
import {useSubscriptionDialog} from "@/app/hooks/useSubscriptionDialog";

export default function UserMenu({ session }: { session: Session | null }) {
    const resetDialogRef = useRef<HTMLDialogElement | null>(null);
    const { openSubscriptionDialog } = useSubscriptionDialog();

    const handleResetProgress = () => {
        resetDialogRef.current?.showModal();
    };

    const [isPremium, setIsPremium] = useState<boolean | null>(null);

    useEffect(() => {
        const userId = localStorage.getItem("user_id");
        if (!userId) return;

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/premium/status?user_id=${userId}`)
            .then((res) => res.json())
            .then((data) => setIsPremium(data.is_active))
            .catch(() => setIsPremium(false));
    }, []);

    return (
        <>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64"
            >
                <li className="menu-title flex items-center gap-2">
                    <div className="avatar">
                        <div className="w-8 rounded-full">
                            {session?.user?.image ? (
                                <img
                                    src={session.user.image}
                                    alt="User Avatar"
                                    referrerPolicy="no-referrer"
                                />
                            ) : (
                                <div className="bg-neutral text-neutral-content flex items-center justify-center w-full h-full">
                                    <span>{session?.user?.name?.charAt(0) || "U"}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <span className="font-bold truncate">{session?.user?.name}</span>
                </li>

                <li>
                    <button onClick={openSubscriptionDialog}>
                        <Crown className="h-4 w-4" />
                        <span>
              Підписка: {isPremium ? "Активна" : "Неактивна"}
            </span>
                    </button>
                </li>

                <div className="divider my-1"></div>

                {/*<li>*/}
                {/*    <Link href="/settings">*/}
                {/*        <Settings className="h-4 w-4" />*/}
                {/*        Налаштування*/}
                {/*    </Link>*/}
                {/*</li>*/}

                <li>
                    <Link href="/telegram">
                        <HelpCircle className="h-4 w-4" />
                        Допомога
                    </Link>
                </li>

                <li>
                    <button onClick={handleResetProgress}>
                        <RefreshCw className="h-4 w-4" />
                        Скинути прогрес
                    </button>
                </li>

                <div className="divider my-1"></div>

                <li>
                    <button onClick={() => signOut()}>
                        <LogOut className="h-4 w-4" />
                        Вийти
                    </button>
                </li>
            </ul>

            {/* Диалог подтверждения сброса */}
            <dialog ref={resetDialogRef} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Скинути прогрес?</h3>
                    <p className="py-4 text-base-content/70">
                        Це назавжди видалить усі ваші відповіді та улюблені питання.
                    </p>
                    <div className="modal-action">
                        <form method="dialog" className="space-x-2">
                            <button className="btn">Скасувати</button>
                            <button
                                type="button"
                                className="btn btn-error"
                                onClick={async () => {
                                    const userId = localStorage.getItem("user_id");
                                    if (!userId) return alert("Користувач не знайдений");

                                    try {
                                        const res = await fetch(
                                            `${process.env.NEXT_PUBLIC_API_URL}/user/reset?user_id=${userId}`,
                                            { method: "POST" }
                                        );
                                        if (!res.ok) {
                                            const data = await res.json();
                                            throw new Error(data.detail || "Невідома помилка");
                                        }

                                        resetDialogRef.current?.close();
                                    } catch (err) {
                                        console.error("Помилка:", err);
                                    }
                                }}
                            >
                                Так, скинути
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
