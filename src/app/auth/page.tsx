import dynamic from "next/dynamic";
import type { FC } from "react";

// ⬇️ добавляем точную аннотацию и каст
const ClientWrapper = dynamic(() => import("./ClientWrapper") as Promise<{ default: FC }>, {
    ssr: false,
});

export default function Page() {
    return <ClientWrapper />;
}