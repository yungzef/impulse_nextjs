"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
    Rocket,
    CalendarDays,
    Bolt,
    BrainCircuit,
    Megaphone,
    MessageSquareHeart,
    Heart,
} from "lucide-react";

export default function TelegramInvitePage() {
    const router = useRouter();

    const handleJoinClick = () => {
        window.open("https://t.me/+XH2VwUOf4EVlNGQ6", "_blank");
        setTimeout(() => {
            router.push("/dashboard");
        }, 1000); // Переход через 1 секунду
    };

    return (
        <div className="min-h-screen flex items-center justify-center animate-fade-in px-4">
            <div className="max-w-3xl w-full p-8 bg-base-100 rounded-2xl shadow-2xl border border-base-300 animate-fade-in">
                <div className="text-center space-y-6">
                    <h1 className="text-4xl font-extrabold text-primary-content flex justify-center items-center gap-2">
                        <Rocket className="w-8 h-8 text-accent" />
                        Вітаємо в Імпульс!
                    </h1>
                    <p className="text-lg text-base-content/80">
                        Тепер ти з нами — і це тільки початок! Ми хочемо, щоб ти здав{" "}
                        <strong>з першого разу</strong> і завжди був на крок попереду.
                    </p>

                    <p className="text-md font-semibold text-base-content">
                        Приєднуйся до нашого Telegram-каналу — там:
                    </p>

                    <ul className="flex flex-col items-center justify-center mt-3 space-y-4 text-base-content/80">
                        <li className="flex items-center gap-2">
                            <Bolt className="w-5 h-5 text-success" />
                            Поради, які допоможуть уникнути помилок
                        </li>
                        <li className="flex items-center gap-2">
                            <CalendarDays className="w-5 h-5 text-success" />
                            Актуальні новини та оновлення тестів
                        </li>
                        <li className="flex items-center gap-2">
                            <MessageSquareHeart className="w-5 h-5 text-success" />
                            Підготовка, що реально працює
                        </li>
                        <li className="flex items-center gap-2">
                            <Heart className="w-5 h-5 text-success" />
                            Психологічна підтримка та мотивація
                        </li>
                    </ul>

                    <div className="mt-10">
                        <button
                            onClick={handleJoinClick}
                            className="btn btn-success btn-lg px-8"
                        >
                            Приєднатися в Telegram
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}