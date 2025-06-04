import { useState } from "react";

export type PlanId = "week" | "monthly" | "3months";

interface PlanMeta {
    amount: number; // в копейках
    durationDays: number;
    description: string;
}

const PLAN_CONFIG: Record<PlanId, PlanMeta> = {
    week: { amount: 49_00, durationDays: 7, description: "Тижневий доступ" },
    monthly: { amount: 9900, durationDays: 30, description: "Місячний доступ" },
    "3months": { amount: 19900, durationDays: 120, description: "3 місяці доступу (+1 у подарунок)" },
};

const isProd = process.env.NODE_ENV === "production";
const TOKEN = process.env.TOKEN;
const URL = process.env.NEXT_PUBLIC_URL;

export function usePremiumPayment() {
    const [isLoading, setIsLoading] = useState(false);

    const initiatePayment = async (plan: PlanId) => {
        const userId = localStorage.getItem("user_id");
        if (!userId) return alert("Користувач не авторизований");

        const { amount, description } = PLAN_CONFIG[plan];
        const reference = generateReference(userId);

        const body = {
            amount,
            ccy: 980,
            redirectUrl: isProd ? "https://impulsepdr.online/dashboard" : "http://localhost:3000/dashboard",
            webHookUrl: isProd
                ? "https://api.impulsepdr.online/webhooks/monobank"
                : "http://localhost:3000/webhooks/monobank",
            saveCard: true,
            walletId: userId,
            merchantPaymInfo: {
                reference,
                destination: `Преміум-доступ (${plan} тариф)`,
            },
            validity: 3600,
        };

        try {
            setIsLoading(true);
            const response = await fetch("/api/create-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();
            if (response.status !== 200 || !data.pageUrl) {
                throw new Error(data.message || "Помилка створення платіжної сторінки");
            }

            window.open(data.pageUrl, "_blank");
        } catch (error: any) {
            console.error("Помилка оплати:", error);
            alert(`Помилка оплати: ${error.message || error}`);
        } finally {
            setIsLoading(false);
        }
    };

    return { initiatePayment, isLoading };
}

function generateReference(userId: string) {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:.TZ]/g, "").slice(0, 12);
    return `premium_${userId}_${timestamp}`;
}
