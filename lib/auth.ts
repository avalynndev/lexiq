import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username, multiSession } from "better-auth/plugins";
import { db } from "@/db";
import { schema } from "@/schema";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import { EmailTemplate } from "@daveyplate/better-auth-ui/server";

const resend = new Resend(process.env.RESEND_API_KEY || "");
const fromEmail = "Lexiq <onboarding@resend.dev>"; // update email

export const auth = betterAuth({
  appName: "lexiq",
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }) => {
      await resend.emails.send({
        from: fromEmail,
        to: user.email,
        subject: "Reset your password",
        react: EmailTemplate({
          heading: "Reset Password",
          content: "Click the button below to reset your password.",
          action: "Reset Password",
          url,
        }),
      });
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  plugins: [nextCookies(), username(), multiSession()],
});
export const { getSession } = auth.api;

export type SessionData = (typeof auth)["$Infer"]["Session"];
