import "@/styles/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Lexiq - Tweak. Fork. Remix your AI prompts",
  description:
    "Discover the best prompts for every AI model, remix them, and evolve your own collection.",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Lexiq" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} bg-background antialiased font-sans text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
