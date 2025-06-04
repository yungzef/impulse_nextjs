// ✅ КЛИЕНТСКИЙ ClientLoader.tsx
"use client";

import dynamic from "next/dynamic";
import type { FC } from "react";

const ClientWrapper = dynamic(() => import("./ClientWrapper") as Promise<{ default: FC }>, {
    ssr: false,
});

export default function ClientLoader() {
    return <ClientWrapper />;
}