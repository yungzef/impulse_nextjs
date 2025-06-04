"use client";
import {Bolt} from "lucide-react";
import Image from "next/image";

export default function AppBar() {
    return (
        <div
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-base-100/01 border-b border-base-200 shadow-sm">
            <div className="navbar max-w-7xl mx-auto px-4">
                <label className="toggle text-base-content">
                    <input type="checkbox" value="forest" className="theme-controller" />

                    <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>

                    <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>

                </label>
                <div className="w-6" />
                <span className="text-xl font-bold">Імпульс</span>

                {/* Navigation */}
                <div className="ml-auto hidden md:flex gap-4">
                    <a href="#about" className="btn btn-ghost text-base">Про нас</a>
                    <a href="#topics" className="btn btn-ghost text-base">Теми</a>
                    <a href="#tickets" className="btn btn-ghost text-base">Білети</a>
                    <a href="#reviews" className="btn btn-ghost text-base">Відгуки</a>
                    <a href="#faq" className="btn btn-ghost text-base">FAQ</a>
                </div>

                {/* Login/Register */}
                <div className="ml-4">
                    <button className="btn btn-outline btn-success btn-md">Увійти</button>
                </div>
            </div>
        </div>
    );
}
