import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito_Sans } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar";
import NavBar from "@/components/NavBar";
import AuthProvider from "@/hooks/auth";
import { Toaster } from "@/components/ui/sonner"
import QueryProvider from "@/lib/tanstackConfig";
import { SearchProvider } from "@/hooks/search";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunitosans = Nunito_Sans({subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-nunito-sans',});

export const metadata: Metadata = {
  title: "Briefly",
  description: "AI Powered WebPage Bookmarker app.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Briefly",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon-512.png" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Briefly" />
          <meta name="theme-color" content="#004CFF" />

      </head>
      <body
        className={`${nunitosans.variable} font-[var(--font-raleway)] antialiased w-dvw h-dvh overflow-hidden flex bg-white`}
      >
        <AuthProvider>
          <QueryProvider>
            <SearchProvider>
            <SideBar />
            <section className="min-h-full w-[80%] bg-light-blue">
              <NavBar />
            {children}
            </section>
            <Toaster/>
            </SearchProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
