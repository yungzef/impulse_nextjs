import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const TOKEN = process.env.TOKEN;
    const body = await req.json();

    const response = await fetch("https://api.monobank.ua/api/merchant/invoice/create", {
        method: "POST",
        headers: {
            "X-Token": TOKEN!,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    return new Response(JSON.stringify(data), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
    });
}