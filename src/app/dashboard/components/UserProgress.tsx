"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

import {JSX, useEffect, useState} from "react";
import { RefreshCcw, FolderKanban, FileText, CheckCircle2, AlertTriangle, Flame } from "lucide-react";

export default function UserProgress({ userId }: { userId: string }) {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState({
        total: 0,
        correct: 0,
        wrong: 0,
        accuracy: 0,
        streak: 0,
        themes: 0,
    });

    const loadProgress = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${API_URL}/user/progress?user_id=${userId}`);
            const data = await res.json();
            setProgress(data);
        } catch (e) {
            console.error("Failed to load progress", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProgress();
    }, [userId]);

    const accuracy = (progress.accuracy * 100).toFixed(1);

    const getProgressColor = (val: number) => {
        if (val > 0.7) return "bg-success";
        if (val > 0.4) return "bg-warning";
        return "bg-error";
    };

    const StatItem = ({ value, label, icon, color }: { value: string; label: string; icon: JSX.Element; color: string }) => (
        <div className="flex flex-col items-center">
            <div className={`p-2 rounded-full bg-opacity-15`} style={{ backgroundColor: color + "22" }}>
                {icon}
            </div>
            <div className="text-lg font-bold" style={{ color }}>{value}</div>
            <div className="text-sm text-base-content/70">{label}</div>
        </div>
    );

    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <div className="rounded-2xl border border-base-300 bg-base-100 shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Ваш прогрес</h2>
                    <button onClick={loadProgress} className="btn btn-sm btn-outline btn-circle">
                        <RefreshCcw className="w-4 h-4" />
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-6">
                        <span className="loading loading-spinner loading-lg" />
                    </div>
                ) : (
                    <>
                        <div className="w-full h-3 rounded-full bg-base-200 overflow-hidden">
                            <div
                                className={`h-full ${getProgressColor(progress.accuracy)}`}
                                style={{ width: `${progress.accuracy * 100}%` }}
                            ></div>
                        </div>

                        <div className="text-right mt-2 text-sm text-base-content/70">
                            {accuracy}% правильних відповідей
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
                            <StatItem value={progress.themes.toString()} label="Теми" icon={<FolderKanban className="w-5 h-5" />} color="#7e22ce" />
                            <StatItem value={progress.total.toString()} label="Всього" icon={<FileText className="w-5 h-5" />} color="#3b82f6" />
                            <StatItem value={progress.correct.toString()} label="Правильно" icon={<CheckCircle2 className="w-5 h-5" />} color="#16a34a" />
                            <StatItem value={progress.wrong.toString()} label="Помилки" icon={<AlertTriangle className="w-5 h-5" />} color="#dc2626" />
                            <StatItem value={progress.streak.toString()} label="Серія" icon={<Flame className="w-5 h-5" />} color="#f59e0b" />
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}