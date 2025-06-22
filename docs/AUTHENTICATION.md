# Authentication Protection

This document explains how authentication protection is implemented for the dashboard routes in the Lexiq application.

## Overview

The dashboard routes (`app/(dashboard)/*`) are protected using multiple layers of authentication:

1. **Server-side Middleware Protection** (`middleware.ts`)
2. **Client-side Layout Protection** (`app/(dashboard)/layout.tsx`)
3. **Optional Component-level Protection** (`components/protected-route.tsx`)

## How It Works

### 1. Server-side Middleware (`middleware.ts`)

The middleware runs on every request and checks if the user is accessing a dashboard route. If the user is not authenticated, they are immediately redirected to the sign-in page.

```typescript
// Checks all routes starting with /(dashboard)
if (request.nextUrl.pathname.startsWith("/(dashboard)")) {
  const session = await getSession(request);
  if (!session) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }
}
```

### 2. Client-side Layout Protection (`app/(dashboard)/layout.tsx`)

The dashboard layout uses the `useSession` hook from better-auth to check authentication status on the client side. This provides:

- Loading states while checking authentication
- Immediate redirects for unauthenticated users
- Prevention of any dashboard content from being rendered

```typescript
const { data: session, isLoading } = useSession();

useEffect(() => {
  if (!isLoading && !session) {
    router.replace("/auth/sign-in");
  }
}, [session, isLoading, router]);
```

### 3. Component-level Protection (Optional)

For additional protection, you can wrap any component with the `ProtectedRoute` component:

```typescript
import { ProtectedRoute } from "@/components/protected-route";

export default function MyProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This content is only visible to authenticated users</div>
    </ProtectedRoute>
  );
}
```

## Benefits

- **No Flash of Unprotected Content**: Users will never see dashboard content even for a split second
- **Multiple Layers**: Server-side and client-side protection ensure robust security
- **Graceful Loading**: Users see a loading spinner while authentication is being verified
- **Automatic Redirects**: Unauthenticated users are seamlessly redirected to sign-in

## Protected Routes

All routes under `app/(dashboard)/` are automatically protected:

- `/admin` - Admin dashboard
- `/settings` - User settings
- `/stars` - User's starred prompts
- Any future dashboard routes

## Testing

To test the protection:

1. Open an incognito/private browser window
2. Navigate directly to any dashboard route (e.g., `/admin`)
3. You should be immediately redirected to `/auth/sign-in`
4. After signing in, you should be able to access the dashboard routes

## Configuration

The authentication is configured using better-auth with the following setup:

- **Provider**: `@daveyplate/better-auth-ui`
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Cookie-based sessions
- **Redirect URLs**: Automatically handled by the middleware
