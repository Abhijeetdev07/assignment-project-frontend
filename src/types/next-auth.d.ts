import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string
            username: string
            accessToken: string
            firstName?: string
            lastName?: string
            image?: string
        } & DefaultSession["user"]
    }

    interface User {
        id: string
        username: string
        token: string
        firstName: string
        lastName: string
        image: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        username: string
        accessToken: string
        firstName?: string
        lastName?: string
        image?: string
    }
}
