"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
            router.replace("/auth"); // ⬅️ safer than push
        } else {
            setChecked(true);
        }
    }, [router]);

    if (!checked) {
        return null; // ❌ не рендерим children до авторизации
    }

    return <>{children}</>;
}