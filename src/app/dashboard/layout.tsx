import AuthGuard from "@/app/components/AuthGuard";
import SubscriptionDialog from "@/app/components/SubscriptionDialog";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return <AuthGuard>{children}<SubscriptionDialog/></AuthGuard>;
}