"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, LayoutDashboard, UserCircle, LogOut } from "lucide-react";
import SearchBar from "@/app/components/SearchBar";
import UserMenu from "@/app/components/UserMenu";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        // Optional: trigger search logic
    };

    return (
        <div className="min-h-screen bg-base-100 flex flex-col">
            {/* Navbar */}
            <div className="navbar bg-base-100 shadow-md sticky top-0 z-50 px-4">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl gap-2">
                        <LayoutDashboard className="w-5 h-5" />
                        Impulse PDR
                    </a>
                </div>

                <div className="flex-none items-center gap-4">
                    <div className="hidden lg:block">
                        <SearchBar onSearch={handleSearch} />
                    </div>

                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                {session?.user?.image ? (
                                    <img
                                        src={session.user.image}
                                        alt="User Avatar"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <div className="bg-neutral text-neutral-content flex items-center justify-center w-full h-full">
                    <span className="text-xl">
                      {session?.user?.name?.charAt(0) || "U"}
                    </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <UserMenu session={session} />
                    </div>
                </div>
            </div>

            {/* Responsive Search (mobile) */}
            <div className="lg:hidden px-4 py-2">
                <SearchBar onSearch={handleSearch} />
            </div>

            {/* Hero Section */}
            <section className="hero bg-base-200 py-12 px-4 md:px-8">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="lg:ml-8 text-center lg:text-center">
                        <h1 className="text-5xl font-bold leading-tight mb-4">
                            Ласкаво просимо, {session?.user?.name || "Користувачу"}!
                        </h1>
                        <p className="py-4 text-lg text-base-content/70">
                            Тут ви знайдете все що треба для здачи іспиту. Ми раді бачити вас знову в <strong>Impulse PDR</strong>!
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Example Cards */}
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={`card-${i}`}
                            className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="card-body">
                                <h2 className="card-title">Модуль #{i + 1}</h2>
                                <p>Короткий опис цього модуля. Тут буде короткий вступ або статус.</p>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary btn-sm">Перейти</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Children */}
                <div className="mt-10">
                    <div className="bg-base-100 p-6 rounded-box shadow-md border border-base-300">
                        {children}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
                <div className="grid grid-flow-col gap-4">
                    <a className="link link-hover">Про нас</a>
                    <a className="link link-hover">Контакти</a>
                    <a className="link link-hover">Умови використання</a>
                    <a className="link link-hover">Політика конфіденційності</a>
                </div>
                <div>
                    <p>© {new Date().getFullYear()} Impulse PDR. Усі права захищено.</p>
                </div>
            </footer>
        </div>
    );
}
