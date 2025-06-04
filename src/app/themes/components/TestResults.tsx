import Link from 'next/link';
import {AnswerResult, Question, TestConfig} from "@/app/themes/types";

interface TestResultsProps {
    questions: Question[];
    answers: AnswerResult[];
    onRestart: () => void;
    config: TestConfig;
}

export default function TestResults({ questions, answers, onRestart, config }: TestResultsProps) {
    const correctCount = answers.filter(a => a.isCorrect).length;
    const percentage = Math.round((correctCount / questions.length) * 100);

    const getResultMessage = () => {
        if (percentage >= 90) return "Відмінно! Ви майстер у цій темі!";
        if (percentage >= 70) return "Добре! Але є ще що вивчити.";
        if (percentage >= 50) return "Непогано, але потрібно більше практики.";
        return "Потрібно повторити матеріал ще раз.";
    };

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4">
            <div className="container mx-auto max-w-3xl">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body text-center">
                        <h1 className="card-title text-3xl">Результати тесту</h1>
                        <h2 className="text-xl text-base-content/70">{config.title}</h2>

                        <div className="flex justify-center items-center my-8">
                            <div
                                className="radial-progress text-success"
                                style={{ '--value': percentage } as React.CSSProperties}
                            >
                                <span className="text-xl font-bold">{percentage}%</span>
                            </div>
                        </div>

                        <p className="text-lg mb-4">{getResultMessage()}</p>

                        <div className="stats shadow justify-center">
                            <div className="stat">
                                <div className="stat-title">Правильних відповідей</div>
                                <div className="stat-value text-success">{correctCount}</div>
                                <div className="stat-desc">з {questions.length}</div>
                            </div>
                        </div>

                        <div className="card-actions mt-6 flex flex-wrap justify-center gap-4">
                            <button onClick={onRestart} className="btn btn-success">Спробувати ще раз</button>
                            <Link href="/dashboard" className="btn btn-ghost">На головну</Link>
                            {config.mode === 'practice' && (
                                <button className="btn btn-secondary">Переглянути помилки</button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <h3 className="text-xl font-bold mb-4">Детальні результати:</h3>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                            <tr>
                                <th>Питання</th>
                                <th>Ваша відповідь</th>
                                <th>Результат</th>
                            </tr>
                            </thead>
                            <tbody>
                            {questions.map((q, i) => {
                                const answer = answers.find(a => a.questionId === q.id);
                                const isCorrect = answer?.isCorrect;

                                return (
                                    <tr key={q.id}>
                                        <td>{i + 1}. {q.question}</td>
                                        <td>{answer ? q.answers[answer.selectedIndex] : 'Не відповіли'}</td>
                                        <td>
                                            {isCorrect ? (
                                                <div className="flex items-center justify-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 16 16"
                                                        fill="currentColor"
                                                        className="text-success w-5 h-5"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 16 16"
                                                        fill="currentColor"
                                                        className="text-error w-5 h-5"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm2.78-4.22a.75.75 0 0 1-1.06 0L8 9.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L6.94 8 5.22 6.28a.75.75 0 0 1 1.06-1.06L8 6.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L9.06 8l1.72 1.72a.75.75 0 0 1 0 1.06Z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                        </td>

                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}