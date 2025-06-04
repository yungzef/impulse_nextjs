export default function TestimonialsSection() {
    return (
        <section className="bg-base-200 py-20">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Відгуки наших учнів</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-base-100 p-6 rounded-box shadow">
                        <p>"Склала іспит з першого разу! Дякую за пояснення та комфортне навчання!"</p>
                        <div className="mt-4 font-semibold">— Анастасія, Київ</div>
                    </div>
                    <div className="bg-base-100 p-6 rounded-box shadow">
                        <p>"AI пояснення — це топ! Реально розумію правила, а не просто відповідаю."</p>
                        <div className="mt-4 font-semibold">— Дмитро, Львів</div>
                    </div>
                    <div className="bg-base-100 p-6 rounded-box shadow">
                        <p>"Зручно на телефоні, планшеті, комп’ютері. Платформа просто супер."</p>
                        <div className="mt-4 font-semibold">— Ірина, Харків</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
