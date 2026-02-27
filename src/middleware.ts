import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

// Only protect /upgrade — /editor and everything else is public
export const config = {
  matcher: ["/upgrade/:path*"],
};
