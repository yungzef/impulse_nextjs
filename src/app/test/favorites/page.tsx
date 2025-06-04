"use client"; // 👈 делает весь файл клиентским

import ClientWrapper from "./ClientWrapper"; // без dynamic

export default function Page() {
    return <ClientWrapper />;
}