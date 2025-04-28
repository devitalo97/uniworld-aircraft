import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      if (nextUrl.pathname.match(/\.(svg|png|jpg|css|js|ico|jpeg)$/)) {
        return true;
      }
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute = [
        "/",
        "/dashboard",
        "/flight",
        "/configuration",
      ].some((route) => {
        if (route === "/") {
          return nextUrl.pathname === route;
        } else {
          return nextUrl.pathname.includes(route);
        }
      });

      if (isProtectedRoute) {
        return isLoggedIn;
      }

      if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
    jwt({ user, token }) {
      if (user) {
        token = Object.assign(token, { id: user.id, role: user.role });
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = String(token.id);
      session.user.role = token.role as "user" | "admin" | "moderator";
      return session;
    },
  },
  providers: [Credentials({})],
} satisfies NextAuthConfig;
