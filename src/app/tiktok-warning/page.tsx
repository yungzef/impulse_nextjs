// src/app/tiktok-warning/page.tsx
"use client";

import { useEffect, useState } from "react";
import {ArrowUp, Copy} from "lucide-react";

const isUnsafeBrowser = (ua: string): boolean => {
    const knownAgents = [
        "musical_ly",
        "bytedancewebview",
        "tiktok",
        "instagram",
        "fbav",
        "wv",
        "okhttp",
    ];
    return knownAgents.some((agent) => ua.toLowerCase().includes(agent));
};

export default function TikTokWarningPage() {
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent;
        const unsafe = isUnsafeBrowser(ua);
        if (!unsafe) {
            window.location.href = "/auth"; // безопасный — редирект
        } else {
            setShowWarning(true); // опасный — показать предупреждение
        }
    }, []);

    const handleCopy = async () => {
        await navigator.clipboard.writeText("https://impulsepdr.online");
    };

    if (!showWarning) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
            <div className="max-w-md text-center space-y-6">
                <div className="absolute top-0 right-0 mt-8 mr-6">
                    <ArrowUp className="w-20 h-20 animate-bounce text-success"/>
                </div>

                <h1 className="text-2xl font-bold text-neutral">
                    Сайт відкрито у TikTok
                </h1>
                <p className="text-lg text-base-content">
                    Щоб пройти реєстрацію — відкрий у браузері.
                </p>
                <p className="text-base text-base-content/70">
                    Натисни у верхньому правому куті <strong>«Відкрити у браузері»</strong>
                </p>

                <button
                    onClick={handleCopy}
                    className="btn btn-success gap-2 text-lg px-6"
                >
                    <Copy className="w-5 h-5" />
                    Скопіювати посилання
                </button>

                <p className="text-success mt-2">https://impulsepdr.online</p>
            </div>
        </div>
    );
}