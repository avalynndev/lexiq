import { AuthCard, authViewPaths } from "@daveyplate/better-auth-ui";

export function generateStaticParams() {
  return Object.values(authViewPaths).map((pathname) => ({ pathname }));
}

export default async function AuthPage({
  params,
  searchParams,
}: {
  params: Promise<{ pathname: string }>;
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const { pathname } = await params;
  const { redirectTo } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthCard pathname={pathname} redirectTo={redirectTo} />
      </div>
    </main>
  );
}
