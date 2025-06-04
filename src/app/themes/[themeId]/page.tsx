"use client";

import {useState, useEffect} from 'react';
import {useParams} from 'next/navigation';
import {Question, TestConfig} from '@/app/themes/types';
import TestCore from "@/app/themes/TestCore";
import Navbar from "@/app/dashboard/components/Navbar";
import Breadcrumbs from "@/app/components/Breadcrumbs";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [themeTitle, setThemeTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const {themeId} = useParams();
    const [errorStatus, setErrorStatus] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!themeId) return;

        const userId = localStorage.getItem("user_id") || "";

        const loadQuestions = async () => {
            try {
                const res = await fetch(`${API_URL}/themes/${themeId}?user_id=${userId}`);
                if (res.status === 403) {
                    setErrorStatus("premium_required");
                    return;
                }
                const data = await res.json();
                setQuestions(data.questions);
                setThemeTitle(data.name);
            } catch (error) {
                console.error('Failed to load theme questions:', error);
            } finally {
                setLoading(false);
            }
        };

        loadQuestions();
    }, [themeId]);

    const config: TestConfig = {
        mode: 'practice',
        title: themeTitle || 'Тематичний тест',
        showExplanation: true,
        allowChangeAnswer: true,
        autoProceed: false,
        aiEnabled: true,
        aiCredits: 5,
        shuffleQuestions: false,
        shuffleAnswers: false,
        showPreviousAnswers: true,
    };

    return (
        <section className="min-h-screen bg-base-200">
            <Navbar></Navbar>
            <div className="min-h-screen bg-base-200">
                <div className="container mx-auto py-10 px-4">
                    <Breadcrumbs
                        items={[
                            {label: 'Головна', href: '/dashboard'},
                            {label: 'Теми', href: '/themes'},
                            {label: themeTitle ? themeTitle : "Помилка"},
                        ]}
                    />
                    <div className="container mx-auto">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                                <div className="card bg-base-100 shadow-xl p-6 text-center">
                                    <span className="loading loading-spinner loading-lg text-primary"></span>
                                    <p className="text-lg font-semibold mt-4">Завантаження тесту...</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <TestCore questions={questions} config={config} errorStatus={errorStatus}/>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}