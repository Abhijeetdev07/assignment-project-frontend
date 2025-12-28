import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

// Define the auth options separate from the handler
// This allows us to export them if needed for server-side usage (getServerSession)
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                try {
                    // We manually call the external login endpoint
                    const res = await axios.post('https://dummyjson.com/auth/login', {
                        username: credentials.username,
                        password: credentials.password,
                    });

                    const user = res.data;

                    // If no error and we have user data, return it
                    if (user && (user.token || user.accessToken)) {
                        return user;
                    }

                    return null;
                } catch (error) {
                    console.error("Login Failed:", error);
                    return null;
                }
            }
        })
    ],
    callbacks: {
        // PWM (Json Web Token) Callback
        // This is called whenever a JWT is created (i.e. at sign in) or updated
        async jwt({ token, user }) {
            // "user" is only available on the first call (sign in)
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.accessToken = (user as any).accessToken || (user as any).token; // DummyJSON returns 'accessToken' now
                token.firstName = (user as any).firstName;
                token.lastName = (user as any).lastName;
                token.image = (user as any).image;
            }
            return token;
        },
        // Session Callback
        // This is called whenever the session is checked (e.g. useSession, getSession)
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).username = token.username;
                (session.user as any).accessToken = token.accessToken;
                (session.user as any).firstName = token.firstName;
                (session.user as any).lastName = token.lastName;
                (session.user as any).image = token.image;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login', // Custom login page
        error: '/login', // Redirect to login on error
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-key-change-me', // Ensure this is set in .env
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
