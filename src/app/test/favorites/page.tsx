import dynamic from "next/dynamic";
import type { FC } from "react";

// 👇 Добавляем типизацию явно, и НЕ используем .then(mod => mod.default)
const ClientWrapper = dynamic<FC>(() => import("./ClientWrapper") as Promise<{ default: FC }>, {
    ssr: false,
});

export default function Page() {
    return <ClientWrapper />;
}