import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BottomTabs, TopNav } from "@/components/nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kyokushin Dojo",
    template: "%s · Kyokushin Dojo",
  },
  description: "Nauka karate Kyokushin: kihon, kata, kihon kumite, programy treningowe i wiedza.",
  appleWebApp: { capable: true, title: "Kyokushin", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#10141b",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <TopNav />
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-6 pb-24 md:pb-12">{children}</main>
        <BottomTabs />
      </body>
    </html>
  );
}
