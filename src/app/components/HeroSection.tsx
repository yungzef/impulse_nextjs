"use client";
import {Bolt} from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="py-24 text-center">
            <div className="max-w-6xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Імпульс</h1>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-base-content">
                    Платформа для підготовки до ПДР з підтримкою AI
                </h2>
                <p className="text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto">
                    Розумні пояснення, зручний інтерфейс, повний набір тестів. І все це — за 99 грн/міс.
                </p>
                <div className="mt-10">
                    <Link href="/auth" className="btn btn-success btn-lg text-lg">Почати навчання</Link>
                </div>
            </div>
        </section>
    );
}
