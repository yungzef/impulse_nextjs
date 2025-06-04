import { BrainCircuit } from "lucide-react";

export default function AIHelper() {
    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <BrainCircuit className="w-12 h-12 mx-auto text-success mb-4" />
                <h2 className="text-3xl font-bold mb-4">Пояснення від штучного інтелекту</h2>
                <p className="text-lg text-base-content/70 mb-10">
                    Ми — єдина платформа, де AI пояснює правильну відповідь, допомагаючи зрозуміти логіку правил.
                </p>

                <div className="flex flex-col gap-4 items-end max-w-xl mx-auto text-left">
                    <div className="chat chat-end">
                        <div className="chat-bubble bg-success text-white">
                            Чи можна обганяти на перехресті?
                        </div>
                    </div>

                    <div className="chat chat-start">
                        <div className="chat-bubble bg-base-200 text-base-content">
                            Ні. Обгін на перехресті заборонений, окрім нерегульованих перехресть за межами населених пунктів.
                        </div>
                    </div>

                    <div className="chat chat-end">
                        <div className="chat-bubble bg-success text-white">
                            А якщо на дорозі дві смуги в кожному напрямку?
                        </div>
                    </div>

                    <div className="chat chat-start">
                        <div className="chat-bubble bg-base-200 text-base-content">
                            У такому випадку — лише якщо це не суперечить розмітці та дорожнім знакам. Але загалом — краще уникати.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
