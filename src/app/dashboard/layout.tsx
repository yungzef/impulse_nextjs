import AuthGuard from "@/app/components/AuthGuard";
import SubscriptionDialog from "@/app/components/SubscriptionDialog";
import {Providers} from "@/app/providers";
import {SessionProvider} from "next-auth/react";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return <SessionProvider><Providers><AuthGuard>{children}<SubscriptionDialog/></AuthGuard></Providers></SessionProvider>;
}