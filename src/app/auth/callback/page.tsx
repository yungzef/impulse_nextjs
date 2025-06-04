"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const accessToken = searchParams.get("access_token");
        const error = searchParams.get("error");

        if (error) {
            router.push(`/auth?error=${encodeURIComponent(error)}`);
            return;
        }

        if (accessToken) {
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", searchParams.get("refresh_token") || "");
            localStorage.setItem("user_id", searchParams.get("sub") || "");
            localStorage.setItem("user_name", searchParams.get("name") || "");
            localStorage.setItem("user_email", searchParams.get("email") || "");

            // Перенаправляем на дашборд
            router.push("/dashboard");
        } else {
            router.push("/auth?error=Не вдалося отримати токен доступу");
        }
    }, [router, searchParams]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
    );
}
