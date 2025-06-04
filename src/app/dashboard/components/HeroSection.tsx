"use client";

export default function HeroSection({ name }: { name?: string }) {
    return (
        <section className="hero bg-base-200 py-12 px-4 md:px-8">
            <div className="hero-content flex-col lg:flex-row">
                <div className="lg:ml-8 text-center lg:text-center">
                    <h1 className="text-5xl font-bold leading-tight mb-4">
                        Ласкаво просимо, {name || "Користувачу"}!
                    </h1>
                    <p className="py-4 text-lg text-base-content/70">
                        Тут ви знайдете все що треба для здачи іспиту. Ми раді бачити вас знову в <strong>Impulse PDR</strong>!
                    </p>
                </div>
            </div>
        </section>
    );
}
