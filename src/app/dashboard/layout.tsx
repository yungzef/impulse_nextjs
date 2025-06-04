// ✅ layout.tsx (серверный, как есть)
import ClientLayoutWrapper from "./ClientLayoutWrapper";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <ClientLayoutWrapper>{children}</ClientLayoutWrapper>;
}