"use client";

import "./globals.css";
import {Providers} from "./providers";
import {SessionProvider} from "next-auth/react";

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
