import "@/app/globals.css";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/layout/header/header";

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Lucia Auth Template",
  description: "nextjs14-lucia-drizzle-turso-template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background antialiased",
          notoSansKR.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-grow">{children}</main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
