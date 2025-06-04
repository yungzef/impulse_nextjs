"use client";

import {JSX, useEffect, useState} from "react";
import {
    RefreshCcw,
    Cpu,
    Clock,
    Star,
    CoinsIcon,
    Crown,
    MessageSquareText,
    MessageCircleWarningIcon,
    FileText, CheckCircle2, ChevronDown, ChevronUp, Sparkles
} from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {useSubscriptionDialog} from "@/app/hooks/useSubscriptionDialog";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function UserDetailedStats({ userId }: { userId: string }) {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);
    const [showFullRecommendations, setShowFullRecommendations] = useState(false);

    const { openSubscriptionDialog } = useSubscriptionDialog();

    const loadStats = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/user/detailed-stats?user_id=${userId}`);
            const data = await res.json();
            setStats(data);
        } catch (e) {
            console.error("Failed to load detailed stats", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) loadStats();
    }, [userId]);

    if (loading || !stats) {
        return (
            <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-lg" />
            </div>
        );
    }

    const progress = stats.progress || {
        total: 0,
        correct: 0,
        accuracy: 0,
        streak: 0
    };

    const accuracy = (progress.accuracy * 100).toFixed(1);
    const total = progress.total || 0;
    const correct = progress.correct || 0;
    const isPremium = stats.premium_status?.is_active;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Детальна статистика</h2>
                <button onClick={loadStats} className="btn btn-sm btn-outline">
                    <RefreshCcw className="w-4 h-4" /> Оновити
                </button>
            </div>

            {/* Загальна статистика */}
            {/*<div className="rounded-xl border border-base-300 bg-base-100 p-6 shadow-md mb-6">*/}
            {/*    <h3 className="text-lg font-semibold mb-4">Загальна статистика</h3>*/}
            {/*    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">*/}
            {/*        <StatCard label="Пройдено" value={total} icon={<FileText />} color="text-blue-500" />*/}
            {/*        <StatCard label="Правильних" value={correct} icon={<CheckCircle2 />} color="text-green-500" />*/}
            {/*        <StatCard label="Неправильних" value={total - correct} icon={<MessageCircleWarningIcon />} color="text-red-500" />*/}
            {/*    </div>*/}
            {/*    <div className="w-full h-3 bg-base-200 rounded-full overflow-hidden">*/}
            {/*        <div className="bg-green-500 h-full" style={{ width: `${progress.accuracy * 100}%` }}></div>*/}
            {/*    </div>*/}
            {/*    <div className="text-sm text-right text-base-content/70 mt-1">{accuracy}% точність</div>*/}
            {/*</div>*/}

            {/* AI Рекомендації */}
            <div className="rounded-xl border border-base-300 bg-base-100 p-6 shadow-md mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-5 h-5 text-purple-500" />
                    <h3 className="text-lg font-semibold">Рекомендації ШІ</h3>
                </div>
                <div className="prose max-w-none">
                    <Markdown remarkPlugins={[remarkGfm]}>
                        {showFullRecommendations
                            ? stats.recommendations
                            : stats.recommendations.split('\n').slice(0, 3).join('\n')}
                    </Markdown>
                </div>
                {stats.recommendations.split('\n').length > 3 && (
                    <div className="mt-4 flex justify-start">
                        <button
                            onClick={() => setShowFullRecommendations(!showFullRecommendations)}
                            className="btn btn-outline btn-sm flex items-center gap-2"
                        >
                            {showFullRecommendations ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            {showFullRecommendations ? "Згорнути" : "Показати більше..."}
                        </button>
                    </div>
                )}
            </div>

            {/* Найчастіші помилки */}
            <div className="rounded-xl border border-base-300 bg-base-100 p-6 shadow-md mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <MessageCircleWarningIcon className="w-5 h-5 text-red-500" />
                    <h3 className="text-lg font-semibold">Найчастіші помилки</h3>
                </div>
                {stats.top_errors.length === 0 ? (
                    <div className="text-sm text-base-content/70">У вас немає повторюваних помилок. Відмінно!</div>
                ) : (
                    <ul className="space-y-3">
                        {stats.top_errors.map((e: any, idx: number) => (
                            <li key={idx} className="border-l-4 border-red-500 pl-4">
                                <p className="text-sm font-medium">{e.question.question}</p>
                                <p className="text-sm text-base-content/70">Правильна відповідь: {e.question.correct_answer}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Premium Info */}
            {/*<div className="rounded-xl border border-base-300 bg-base-100 p-6 shadow-md mb-6">*/}
            {/*    <div className="flex items-center gap-2 mb-4">*/}
            {/*        <Crown className="w-5 h-5 text-accent" />*/}
            {/*        <h3 className="text-lg font-semibold">Преміум та кредити</h3>*/}
            {/*    </div>*/}

            {/*    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">*/}
            {/*        <StatCard label="Кредити" value={stats.credit_info.credits_remaining} icon={<CoinsIcon />} color="text-primary" />*/}
            {/*        <StatCard label="Закладки" value={stats.favorites_count} icon={<Star />} color="text-primary" />*/}
            {/*        <StatCard label="Денний ліміт" value={`${stats.credit_info.credits_remaining}/${stats.credit_info.daily_limit}`} icon={<Clock />} color="text-primary" />*/}
            {/*    </div>*/}
            {/*</div>*/}

            {!isPremium && (
                <div className="alert alert-primary mb-4">
                    <Sparkles className="w-5 h-5" />
                    <span>Хочете більше можливостей? Підпишіться на преміум та отримайте необмежений доступ!</span>
                    <button className="btn btn-sm btn-primary btn-soft ml-auto" onClick={openSubscriptionDialog}>Отримати преміум</button>
                </div>
            )}

            <div className="text-center text-xs text-base-content/60 pt-10">
                <Clock className="inline w-4 h-4 mr-1" /> Оновлено {new Date(stats.last_updated).toLocaleString("uk-UA")}
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, color }: { label: string; value: any; icon: JSX.Element; color: string }) {
    return (
        <div className="flex items-center gap-4">
            <div className={`p-2 rounded-full bg-base-200 ${color}`}>{icon}</div>
            <div>
                <div className="text-lg font-semibold leading-tight">{value}</div>
                <div className="text-sm text-base-content/70 leading-none">{label}</div>
            </div>
        </div>
    );
}