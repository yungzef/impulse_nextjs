"use client";
export const dynamic = 'force-dynamic';
import { useEffect, useState } from "react";
import { Loader2, ChevronRight, Lock } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/dashboard/components/Navbar";
import Breadcrumbs from "@/app/components/Breadcrumbs";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ThemePreview {
    index: number;
    name: string;
    question_count: number;
    last_answered_index?: number;
    accuracy?: number;
}

export default function Page() {
    const [themes, setThemes] = useState<ThemePreview[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPremium, setIsPremium] = useState<boolean>(false);

    const userId = typeof window !== "undefined" ? localStorage.getItem("user_id") : null;

    const loadPremiumStatus = async () => {
        try {
            const res = await fetch(`${API_URL}/premium/status?user_id=${userId}`);
            const data = await res.json();
            setIsPremium(data.is_active === true);
        } catch (e) {
            console.error("Ошибка при получении статуса премиум", e);
            setIsPremium(false);
        }
    };

    const loadThemes = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/themes/preview?user_id=${userId || ""}`);
            const data = await res.json();
            setThemes(data);
        } catch (e) {
            console.error("Failed to load themes", e);
            setError("Не вдалося завантажити теми.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!userId) return;
        loadPremiumStatus();
        loadThemes();
    }, [userId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 py-8">{error}</div>
        );
    }

    return (
        <>
            <Navbar />
            <main className="w-full max-w-6xl mx-auto px-4 py-8">
                <Breadcrumbs
                    items={[
                        { label: 'Головна', href: '/dashboard' },
                        { label: 'Теми' },
                    ]}
                />
                <h1 className="text-2xl font-bold mb-6">Навчальні теми</h1>
                <div className="grid gap-4">
                    {themes.map((theme) => (
                        <ThemeCard key={theme.index} theme={theme} isLocked={!isPremium && theme.index > 15} />
                    ))}
                </div>
            </main>
        </>
    );
}

function ThemeCard({ theme, isLocked }: { theme: ThemePreview; isLocked: boolean }) {
    const progressValue = theme.question_count > 0 ? (theme.last_answered_index || 0) / theme.question_count : 0;

    const getColor = (accuracy?: number) => {
        if (accuracy == null) return "bg-gray-400";
        if (accuracy > 0.7) return "bg-green-500";
        if (accuracy > 0.4) return "bg-orange-400";
        return "bg-red-500";
    };

    if (isLocked) {
        return (
            <div className="card bg-base-200 border border-base-300 shadow-md opacity-60 cursor-not-allowed">
                <div className="card-body flex flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="radial-progress text-base-content/40" style={{ "--value": "0", "--size": "56px", "--thickness": "4px" } as any}>
                                0%
                            </div>
                            <div className="absolute top-[6px] left-[6px] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm bg-gray-500">
                                {theme.index}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold leading-tight">{theme.name}</h2>
                            <p className="text-sm text-base-content/50">Тільки для преміум</p>
                        </div>
                    </div>
                    <Lock className="w-5 h-5 text-base-content/50" />
                </div>
            </div>
        );
    }

    return (
        <Link href={`/themes/${theme.index}`} className="card bg-base-100 border border-base-300 shadow-md hover:shadow-lg transition-all">
            <div className="card-body flex flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="radial-progress text-primary" style={{ "--value": Math.round(progressValue * 100), "--size": "56px", "--thickness": "4px" } as any}>
                            {Math.round(progressValue * 100)}%
                        </div>
                        <div className={`absolute top-[6px] left-[6px] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${getColor(theme.accuracy)}`}>
                            {theme.index}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold leading-tight">{theme.name}</h2>
                        <p className="text-sm text-base-content/70">{theme.question_count} питань</p>
                    </div>
                </div>
                <ChevronRight className="w-5 h-5 text-base-content/60" />
            </div>
        </Link>
    );
}
