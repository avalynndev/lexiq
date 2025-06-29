"use client";

import { AuthCard } from "@daveyplate/better-auth-ui";
import { useParams } from "next/navigation";
import { GlowingBackground } from "@/components/glowing-background";
import { FloatingElements } from "@/components/floating-elements";

export default function AuthPage() {
  const params = useParams<{ pathname: string }>();

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <GlowingBackground />
      <FloatingElements />
      <div className="w-full max-w-md">
        <AuthCard pathname={params.pathname} />
      </div>
    </main>
  );
}
