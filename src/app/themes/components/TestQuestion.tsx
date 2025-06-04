import {Question} from "@/app/themes/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface TestQuestionProps {
    question: Question;
    selectedAnswer?: number;
    showCorrect: boolean;
    onAnswer: (index: number, question: Question) => void; // ← тут
    disabled: boolean;
    correctIndex: number;
}

export default function TestQuestion({
                                         question,
                                         selectedAnswer,
                                         showCorrect,
                                         onAnswer,
                                         disabled,
                                         correctIndex,
                                     }: TestQuestionProps) {
    // Явно приводим selectedAnswer к number (на случай undefined или строки)
    const normalizedSelected = selectedAnswer !== undefined ? Number(selectedAnswer) : undefined;

    const getButtonClass = (index: number) => {
        if (!showCorrect) {
            return normalizedSelected === index ? "btn-primary" : "btn-outline";
        }

        const isCorrect = index === correctIndex;
        const isSelected = index === normalizedSelected;

        if (isCorrect) return "btn-success";
        if (isSelected && !isCorrect) return "btn-error";
        return "btn-outline";
    };

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-4">
                <div className="flex flex-col lg:flex-row gap-6">
                    {question.image && (
                        <div className="lg:w-1/2">
                            <img
                                src={`${API_URL}/themes/${question.image}`}
                                alt="Ілюстрація до питання"
                                className="rounded-lg w-full object-contain max-h-64 lg:max-h-96"
                            />
                        </div>
                    )}

                    <div className={`flex flex-col gap-4 ${question.image ? 'lg:w-1/2' : 'w-full'}`}>
                        <h2 className="text-2xl font-semibold">{question.question}</h2>
                        <div className="grid grid-cols-1 gap-3">
                            {question.answers.map((answer, index) => (
                                <button
                                    key={index}
                                    className={`btn min-h-fit w-full text-left normal-case whitespace-normal break-words px-2 py-2 ${getButtonClass(index)}`}
                                    onClick={() => {
                                        if (!disabled) onAnswer(index, question);
                                    }}
                                >
                                    <span className="font-bold mx-2">{index + 1}.</span>
                                    <span className="flex-1 block leading-relaxed">{answer}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}