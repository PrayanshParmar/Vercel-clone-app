import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { cn } from "@/lib/utils";
import { ModelProvider } from "@/components/providers/model-provider";
import { Toaster } from "@/components/ui/toaster"
import { GeistSans } from "geist/font/sans";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";


export const metadata: Metadata = {
  title: "Hostify: Build and deploy the best way experiences with The Frontend Cloud",
  description: "Hostify Frontend Cloud gives developers the frameworks, workflows, and infrastructure to build a faster, more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={ cn(GeistSans.className, "bg-[#FAFAFA] dark:bg-[#000]")}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            storageKey="vercel-theme"
            disableTransitionOnChange
          >
            <Toaster/>
            <ModelProvider />
            <QueryProvider>
            {children}
            </QueryProvider>
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
