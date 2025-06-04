"use client";

import { FileText } from "lucide-react";

export default function ModuleCards() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
                <div
                    key={`card-${i}`}
                    className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow duration-300"
                >
                    <div className="card-body">
                        <h2 className="card-title flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Модуль #{i + 1}
                        </h2>
                        <p>
                            Короткий опис цього модуля. Тут буде короткий вступ або статус. Вивчайте, повторюйте, проходьте!
                        </p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary btn-sm">Перейти</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
