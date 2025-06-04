import { BookOpenCheck, ClipboardList, Flame, Bookmark, RefreshCw } from "lucide-react";

const modes = [
    { icon: <ClipboardList />, title: "Офіційні білети", desc: "40 білетів по 20 питань — як на іспиті" },
    { icon: <BookOpenCheck />, title: "Тематичні тести", desc: "Тести по розділах ПДР — від знаків до зупинки" },
    { icon: <Flame />, title: "Складні питання", desc: "ТОП-100 помилок за статистикою учнів" },
    { icon: <RefreshCw />, title: "Робота над помилками", desc: "Персональний аналіз твоїх відповідей" },
    { icon: <Bookmark />, title: "Мої закладки", desc: "Збережи питання, які хочеш повторити" },
    { icon: <ClipboardList />, title: "Екзаменаційний режим", desc: "Симуляція іспиту в умовах ТСЦ" },
];

export default function TestingModes() {
    return (
        <section className="bg-base-200 py-20">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Режими навчання</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {modes.map((mode, i) => (
                        <div key={i} className="p-6 bg-base-100 rounded-box shadow text-center">
                            <div className="flex justify-center text-primary mb-4">{mode.icon}</div>
                            <h3 className="font-semibold text-xl mb-2">{mode.title}</h3>
                            <p className="text-gray-500">{mode.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
