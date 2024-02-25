import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/providers/theme-provider"
import "./globals.css";
import { cn } from "@/lib/utils";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vercel clone App",
  description: "Vercel clone App, contributed by Prayansh Parmar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={ cn(font.className, "bg-[#FAFAFA] dark:bg-[#000]")}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            storageKey="vercel-theme"
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
