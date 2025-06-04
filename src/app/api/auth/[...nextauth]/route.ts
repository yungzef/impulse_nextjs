import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const URL = process.env.NEXT_PUBLIC_URL;

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: "jwt", // либо "database" — зависит от вашей конфигурации
    },
    callbacks: {
        async jwt({token, user, account, profile}) {
            if (user) {
                token.id = user.id;
                // Add subscription status from your API
                const res = await fetch(`${URL}/premium/status?user_id=${user.id}`);
                const data = await res.json();
                token.subscription = data.is_active;
            }
            return token;
        },
        async session({ session, token }) {
            (session.user as any).id = token.id;
            (session.user as any).subscription = token.subscription;
            return session;
        }

    },
    secret: "process.env.NEXTAUTH_SECRET",
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};