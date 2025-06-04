// src/app/tests/errors/page.tsx
export const dynamic = 'force-dynamic';
"use client";

import { useEffect, useState } from "react";
import { Question, TestConfig } from "@/app/themes/types";
import TestCore from "@/app/themes/TestCore";
import Navbar from "@/app/dashboard/components/Navbar";
import Breadcrumbs from "@/app/components/Breadcrumbs";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ErrorsTestPage() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState<string | undefined>(undefined);

    useEffect(() => {
        const userId = localStorage.getItem("user_id") || "anonymous";
        const fetchQuestions = async () => {
            try {
                const res = await fetch(`${API_URL}/user/errors?user_id=${userId}`);
                if (res.status === 403) {
                    setErrorStatus("premium_required");
                    return;
                }
                const data = await res.json();
                setQuestions(data.questions); // ✅ здесь
            } catch (error) {
                console.error("Ошибка загрузки вопросов с ошибками:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const config: TestConfig = {
        mode: "errors",
        title: "Мої помилки",
        showExplanation: true,
        allowChangeAnswer: false,
        autoProceed: false,
        aiEnabled: true,
        aiCredits: 5,
        shuffleQuestions: false,
        shuffleAnswers: false,
        showPreviousAnswers: false,
    };
    return (
        <section className="min-h-screen bg-base-200">
            <Navbar/>
            <div className="container mx-auto py-10 px-4">
                <Breadcrumbs
                    items={[{ label: 'Головна', href: '/dashboard' }, { label: 'Мої помилки' }]}
                />
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64 space-y-4">
                        <div className="card bg-base-100 shadow-xl p-6 text-center">
                            <span className="loading loading-spinner loading-lg text-primary"></span>
                            <p className="text-lg font-semibold mt-4">Завантаження помилок...</p>
                        </div>
                    </div>
                ) : (
                    <TestCore questions={questions} config={config} errorStatus={errorStatus}/>
                )}
            </div>
        </section>
    );
}