"use client";

import {Exo_2} from 'next/font/google';
import {Inter} from 'next/font/google';
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";
import {SessionProvider} from "next-auth/react";
import SubscriptionDialog from "@/app/components/SubscriptionDialog";

export const exo2 = Exo_2({
    variable: '--font-exo2',
    subsets: ['latin', 'cyrillic'], // Добавьте 'cyrillic' для поддержки кириллицы
    display: 'swap',
});

export const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-theme="lemonade">
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;600;700&display=swap"
                rel="stylesheet"
            />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
            />
            <title>Імпульс</title>
        </head>
        <body style={{fontFamily: '"Exo 2", sans-serif'}}>
        <SessionProvider><Providers>{children}</Providers></SessionProvider>
        </body>
        </html>
    );
}
