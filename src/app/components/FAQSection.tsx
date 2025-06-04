const faqs = [
    { q: "Скільки коштує доступ?", a: "Лише 99 грн/міс без прихованих платежів." },
    { q: "Чи можна користуватись на телефоні?", a: "Так! Платформа працює на будь-якому пристрої." },
    { q: "Чи є гарантія здачі іспиту?", a: "Так! Якщо не здаси — повернемо кошти." },
    { q: "Чим ви кращі за інші платформи?", a: "У нас AI-пояснення, персональна аналітика та краща ціна." },
    { q: "Чи потрібно щось встановлювати?", a: "Ні. Просто відкрий сайт у браузері." },
];

export default function FAQSection() {
    return (
        <section className="bg-base-100 py-20">
            <div key="faq" className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Поширені питання</h2>
                <div className="join join-vertical w-full">
                    {faqs.map((item, i) => (
                        <div className="collapse collapse-arrow bg-base-100 border border-base-300 m-1">
                            <input type="radio" name="my-accordion-1" defaultChecked />
                            <div className="collapse-title font-semibold">{item.q}</div>
                            <div className="collapse-content text-sm">{item.a}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
