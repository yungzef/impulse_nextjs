// ✅ Окончательное решение с отображением правильного и выбранного ответа
// ❌ Пользователь не может менять выбор, показывается правильный и его вариант

import {useState, useEffect, useCallback} from 'react';
import {AnswerResult, Question, TestConfig} from "@/app/themes/types";
import TestQuestion from "@/app/themes/components/TestQuestion";
import TestNavigation from "@/app/themes/components/TestNavigation";
import TestResults from "@/app/themes/components/TestResults";
import TestProgress from "@/app/themes/components/TestProgress";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import {ChevronDown, ChevronRight, BotMessageSquare} from "lucide-react";
import ReactMarkdown from "react-markdown";
import {Star, StarOff} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface TestCoreProps {
    questions: Question[];
    config: TestConfig;
    onComplete?: (results: AnswerResult[]) => void;
    errorStatus?: string; // ⬅️ добавлено
}

export default function TestCore({questions, config, onComplete, errorStatus}: TestCoreProps) {
    if (errorStatus === 'premium_required') {
        return (
            <div className="max-w-2xl mx-auto text-center mt-12 p-6 border border-neutral bg-warning/10 rounded-xl">
                <h2 className="text-xl font-bold mb-4 text-neutral">Ця тема доступна лише для преміум-користувачів</h2>
                <p className="text-base-content/70 mb-4">
                    Щоб отримати доступ до цієї теми, оформіть преміум-підписку.
                </p>
                <a href="subscription" className="btn btn-warning">Перейти до підписки</a>
            </div>
        );
    }
    if (!questions || questions.length === 0) {
        return (
            <div className="text-center text-neutral mt-12">
                <h2 className="text-xl font-bold">Питання не знайдено</h2>
                <p className="text-base-content/70 mt-2">
                    Можливо, сталася помилка або тема порожня.
                </p>
            </div>
        );
    }
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<AnswerResult[]>([]);
    const [shownExplanationIds, setShownExplanationIds] = useState<string[]>([]);
    const [aiExplanation, setAiExplanation] = useState<string | null>(null);
    const [isLoadingAi, setIsLoadingAi] = useState(false);
    const [remainingCredits, setRemainingCredits] = useState(0);
    const [isExplanationOpen, setIsExplanationOpen] = useState(true);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);
    const [errorCount, setErrorCount] = useState(0);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const currentQuestion = questions[currentIndex];
    const isLastQuestion = currentIndex === questions.length - 1;
    const isCompleted = currentIndex >= questions.length;

    useEffect(() => {
        if (currentQuestion) {
            setIsFavorite(!!(currentQuestion as any).is_favorite);
        }
    }, [currentQuestion]);


    useEffect(() => {
        const fetchCredits = async () => {
            const userId = localStorage.getItem("user_id") || "anonymous";
            try {
                const res = await fetch(`${API_URL}/user/credits?user_id=${userId}`);
                const data = await res.json();
                setRemainingCredits(data.credits_remaining);
            } catch (error) {
                console.error("Ошибка загрузки кредитов:", error);
            }
        };
        fetchCredits();
    }, []);

    useEffect(() => {
        if (config.mode === "timed") {
            const started = Date.now();
            setStartTime(started);
            const interval = setInterval(() => {
                setElapsedSeconds(Math.floor((Date.now() - started) / 1000));
            }, 1000);
            const timer = setTimeout(() => {
                setCurrentIndex(questions.length); // завершить тест
            }, 20 * 60 * 1000);
            return () => {
                clearTimeout(timer);
                clearInterval(interval);
            };
        }
    }, [config.mode, questions.length]);

    useEffect(() => {
        if (config.mode === "timed" && errorCount >= 3) {
            setCurrentIndex(questions.length);
        }
    }, [errorCount, config.mode, questions.length]);

    const handleNext = useCallback(() => {
        if (isLastQuestion) onComplete?.(answers);
        setCurrentIndex(prev => prev + 1);
        setAiExplanation(null);
    }, [isLastQuestion, answers, onComplete]);

    const handleAnswer = useCallback(async (selectedIndex: number, question: Question) => {
        const normalizedSelected = Number(selectedIndex);
        const rawCorrectIndex = (question as any).correct_index;
        const normalizedCorrect = Number(rawCorrectIndex);
        const isCorrect = normalizedSelected === normalizedCorrect;

        const result: AnswerResult = {
            questionId: question.id,
            selectedIndex: normalizedSelected,
            isCorrect,
            timestamp: new Date().toISOString(),
        };

        setAnswers(prev => {
            const existingIndex = prev.findIndex(a => a.questionId === question.id);
            const updated = existingIndex >= 0 ? (() => {
                const copy = [...prev];
                copy[existingIndex] = result;
                return copy;
            })() : [...prev, result];
            return updated;
        });

        setShownExplanationIds(prev => [...prev, question.id]);

        if (!isCorrect) setErrorCount(prev => prev + 1);

        const userId = localStorage.getItem("user_id");
        if (userId) {
            try {
                await fetch(`${API_URL}/user/answer`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        user_id: userId,
                        question_id: question.id,
                        is_correct: isCorrect
                    })
                });
            } catch (error) {
                console.error("Не удалось отправить ответ на сервер:", error);
            }
        }

        if (config.autoProceed) setTimeout(() => handleNext(), 1500);
    }, [config.autoProceed, handleNext]);

    const handlePrev = useCallback(() => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setAiExplanation(null);
        }
    }, [currentIndex]);

    const handleJumpToQuestion = useCallback((index: number) => {
        if (index >= 0 && index < questions.length) {
            setCurrentIndex(index);
            setAiExplanation(null);
        }
    }, [questions.length]);

    const handleRestart = useCallback(() => {
        setCurrentIndex(0);
        setAnswers([]);
        setShownExplanationIds([]);
        setAiExplanation(null);
        setErrorCount(0);
        setStartTime(Date.now());
        setElapsedSeconds(0);
    }, []);

    const handleAskAI = useCallback(async () => {
        if (remainingCredits <= 0) return;

        setIsLoadingAi(true);
        try {
            const userId = localStorage.getItem("user_id") || "anonymous";
            const response = await fetch(`${API_URL}/pdr/question?user_id=${userId}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    question: currentQuestion.question,
                    context: currentQuestion.answers.join("\n")
                })
            });

            const data = await response.json();
            setAiExplanation(data.answer);
            setRemainingCredits(prev => prev - 1);
        } catch (error) {
            console.error('Помилка AI:', error);
        } finally {
            setIsLoadingAi(false);
        }
    }, [currentQuestion, remainingCredits]);

    useEffect(() => {
        if (!config.showPreviousAnswers) {
            // Не подгружаем историю — начинаем с чистого теста
            setCurrentIndex(0);
            setAnswers([]);
            setShownExplanationIds([]);
            setAiExplanation(null);
            return;
        }
        const restored: AnswerResult[] = (questions as (Question & { was_answered_correctly?: boolean })[])
            .map((q) => {
                if (q.was_answered_correctly == null) return null;
                return {
                    questionId: q.id,
                    selectedIndex: -1,
                    isCorrect: q.was_answered_correctly,
                    timestamp: new Date().toISOString(),
                };
            })
            .filter(Boolean) as AnswerResult[];

        const firstUnanswered = questions.findIndex(q => (q as any).was_answered_correctly == null);

        setAnswers(restored);
        setShownExplanationIds(restored.map(r => r.questionId));
        setCurrentIndex(firstUnanswered >= 0 ? firstUnanswered : 0);
        setAiExplanation(null);
    }, [questions]);

    if (isCompleted) {
        return (
            <TestResults
                questions={questions}
                answers={answers}
                onRestart={handleRestart}
                config={config}
            />
        );
    }

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        const toast = document.createElement('div');
        toast.className = `alert ${type === 'success' ? 'alert-success' : 'alert-error'} text-sm shadow-lg`;
        toast.innerHTML = `<span>${message}</span>`;
        document.getElementById('favorite-toast')?.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 2500);
    };

    const handleToggleFavorite = async () => {
        const userId = localStorage.getItem("user_id");
        if (!userId) return;

        try {
            const res = await fetch(`${API_URL}/user/favorites/toggle`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userId,
                    question_id: currentQuestion.id,
                }),
            });

            const data = await res.json();
            if (data.status === "ok") {
                const newValue = !isFavorite;
                setIsFavorite(newValue);
                showToast(newValue ? "Додано до обраного" : "Видалено з обраного");
            }
        } catch (err) {
            console.error("Помилка додавання до улюбленого:", err);
        }
    };


    const selectedAnswer = answers.find(a => a.questionId === currentQuestion.id)?.selectedIndex;
    const hasAnswered = selectedAnswer !== undefined;
    const correctIndex = Number((currentQuestion as any).correct_index);
    const showExplanation = shownExplanationIds.includes(currentQuestion.id);

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
            </div>

            <div className="mb-6">
                <div className="relative mb-4">
                    <TestProgress
                        current={currentIndex + 1}
                        elapsedSeconds={elapsedSeconds}
                        total={questions.length}
                        config={config}
                    />
                </div>

                <TestQuestion
                    question={currentQuestion}
                    selectedAnswer={selectedAnswer}
                    showCorrect={showExplanation}
                    onAnswer={(index) => handleAnswer(index, currentQuestion)}
                    disabled={hasAnswered}
                    correctIndex={correctIndex}
                />
            </div>

            {(showExplanation || aiExplanation) && (
                <div className="mb-6">
                    <div className="bg-base-100 border border-base-300 rounded-xl shadow-xl overflow-hidden">
                        <button
                            onClick={() => setIsExplanationOpen(prev => !prev)}
                            className="w-full text-left px-4 py-2 bg-info text-success-content font-semibold text-sm flex items-center gap-2"
                        >
                            {isExplanationOpen ? <ChevronDown className="w-4 h-4"/> :
                                <ChevronRight className="w-4 h-4"/>}
                            <span>Пояснення до питання</span>
                        </button>
                        {isExplanationOpen && (
                            <div className="p-4 space-y-4">
                                <p className="text-base leading-relaxed">{currentQuestion.explanation || 'Пояснення відсутнє'}</p>

                                {aiExplanation && (
                                    <div className="bg-success/10 border-l-4 border-success px-4 py-3 rounded-md">
                                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                                            <BotMessageSquare className="w-4 h-4"/> Відповідь AI:
                                        </h3>
                                        <div
                                            className="prose prose-sm max-w-none whitespace-pre-wrap text-sm leading-relaxed">
                                            <ReactMarkdown>{aiExplanation}</ReactMarkdown>
                                        </div>
                                    </div>
                                )}

                                {!aiExplanation && config.aiEnabled && (
                                    <button
                                        onClick={handleAskAI}
                                        disabled={isLoadingAi || remainingCredits <= 0}
                                        className="btn btn-sm btn btn-info"
                                    >
                                        {isLoadingAi ? (
                                            <span className="loading loading-spinner"></span>
                                        ) : (
                                            `Отримати пояснення від AI (${remainingCredits} залишилось)`
                                        )}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <TestNavigation
                onNext={handleNext}
                onPrev={handlePrev}
                onJump={handleJumpToQuestion}
                showNext={true} //{!config.autoProceed || isLastQuestion}
                showPrev={currentIndex > 0}
                isLast={isLastQuestion}
                config={config}
                handleToggleFavorite={handleToggleFavorite}
                isFavorite={isFavorite}
            />
            <div className="toast toast-bottom toast-center z-50" id="favorite-toast"/>
        </div>
    );
}