"use client";

import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AuthPage() {
    const router = useRouter();

    const handleGoogleLogin = () => {
        const GOOGLE_CLIENT_ID = "147419489204-mcv45kv1ndceffp1efnn2925cfet1ocb.apps.googleusercontent.com";
        const REDIRECT_URI = `${API_URL}/auth/google/callback`;

        const params = new URLSearchParams({
            client_id: GOOGLE_CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            response_type: "code",
            scope: "openid email profile",
            access_type: "offline",
            prompt: "consent",
        });

        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    };

    return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
            <div className="card w-full max-w-md bg-base-200 shadow-xl border border-base-300">
                <div className="card-body p-8">
                    <div className="text-center space-y-6">
                        <h1 className="text-3xl font-bold">Вхід до Impulse PDR</h1>
                        <p className="text-base-content/70">
                            Увійдіть через Google, щоб продовжити навчання
                        </p>

                        <div className="w-full mt-4">
                            <button
                                onClick={handleGoogleLogin}
                                className="btn btn-success w-full"
                            >
                                <LogIn className="mr-2" />
                                Увійти через Google
                            </button>
                        </div>
                    </div>

                    <div className="divider my-6">АБО</div>

                    <Link href="/" className="btn btn-ghost w-full">
                        На головну
                    </Link>
                </div>
            </div>
        </div>
    );
}
