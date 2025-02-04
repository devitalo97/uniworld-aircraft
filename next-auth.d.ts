import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      email: string;
      created_at: Date;
      id: string;
      role: "user" | "admin" | "moderator"
    }
  }

  interface User {
    email: string;
    id: string;
    role: "user" | "admin" | "moderator";
    created_at: Date
  }
}