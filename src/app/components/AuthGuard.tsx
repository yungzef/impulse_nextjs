"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) {
            router.push("/auth");
        }
    }, [router]);

    return <>{children}</>;
}