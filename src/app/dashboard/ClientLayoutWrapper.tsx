"use client";

import { SessionProvider } from "next-auth/react";
import { Providers } from "@/app/providers";
import AuthGuard from "@/app/components/AuthGuard";
import SubscriptionDialog from "@/app/components/SubscriptionDialog";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <Providers>
                <AuthGuard>
                    {children}
                    <SubscriptionDialog />
                </AuthGuard>
            </Providers>
        </SessionProvider>
    );
}