"use client";

import { BookOpenCheck, FileEdit, Ban, Star, Flag, GraduationCap } from "lucide-react";
import Link from "next/link";
import React from "react";

const modes = [
    {
        title: "Теми",
        description: "Вивчайте питання за темами",
        icon: <BookOpenCheck className="w-8 h-8 text-primary" />,
        href: "/themes",
    },
    {
        title: "Білет",
        description: "Тренуйтеся на повних білетах",
        icon: <FileEdit className="w-8 h-8 text-primary" />,
        href: "/test/random",
    },
    {
        title: "Мої помилки",
        description: "Повторюйте питання, де помилялися",
        icon: <Ban className="w-8 h-8 text-primary" />,
        href: "/test/errors",
    },
    {
        title: "Обрані питання",
        description: "Працюйте зі збереженими питаннями",
        icon: <Star className="w-8 h-8 text-primary" />,
        href: "/test/favorites",
    },
    {
        title: "Марафон",
        description: "Безмежний режим тренування",
        icon: <Flag className="w-8 h-8 text-primary" />,
        href: "/dashboard",
    },
    {
        title: "Екзамен",
        description: "Імітація реального іспиту",
        icon: <GraduationCap className="w-8 h-8 text-primary" />,
        href: "/test/timed",
    },
];

export default function ModeCards() {
    return (
        <main className="flex-grow container mx-auto px-4 py-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {modes.map((mode) => (
                        <ModeCard key={mode.href} {...mode} />
                    ))}
            </div>
        </main>
    );
}

function ModeCard({
                      title,
                      description,
                      icon,
                      href,
                  }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
}) {
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow border border-base-300">
            <div className="card-body">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                        {icon}
                    </div>
                    <div>
                        <h2 className="card-title text-lg md:text-xl font-semibold">{title}</h2>
                        <p className="text-sm text-base-content/70">{description}</p>
                    </div>
                </div>
                <div className="card-actions justify-end mt-6">
                    <Link href={href} className="btn btn-primary btn-soft">
                        Почати
                    </Link>
                </div>
            </div>
        </div>
    );
}
