import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login",
    },
});

export const config = {
    // Protects the home page, users, and products routes
    // Adjust matchers as the routing structure evolves
    matcher: [
        "/",
        "/dashboard/:path*",
        "/users/:path*",
        "/products/:path*"
    ],
};
