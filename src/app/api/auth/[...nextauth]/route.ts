import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const URL = process.env.NEXT_PUBLIC_URL;

console.log("[ENV CHECK]", {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
});

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            console.log("[JWT CALLBACK]", { token, user });
            if (user) {
                token.id = user.id;

                try {
                    const res = await fetch(`${API_URL}/premium/status?user_id=${user.id}`);
                    if (!res.ok) throw new Error("Bad response");
                    const data = await res.json();
                    token.subscription = data.is_active;
                } catch (e) {
                    console.error("[JWT ERROR]", e);
                    token.subscription = false;
                }
            }

            return token;
        },

        async session({ session, token }) {
            console.log("[SESSION CALLBACK]", { session, token });
            (session.user as any).id = token.id;
            (session.user as any).subscription = token.subscription;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };