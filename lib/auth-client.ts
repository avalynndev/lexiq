import { createAuthClient } from "better-auth/react";
import { usernameClient, multiSessionClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [usernameClient(), multiSessionClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
