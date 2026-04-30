import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { InteractiveAssistant } from "@/components/InteractiveAssistant";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Election Compass | Your Premium Civic Companion",
  description: "Navigate the complex election landscape with precision, clarity, and the power of AI.",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body suppressHydrationWarning className={`${outfit.variable} ${inter.variable} antialiased`}>
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[100] px-4 py-2 bg-cyan text-white rounded-lg font-bold"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main-content" className="pt-28 pb-20 min-h-screen relative">
          {children}
        </main>
        <InteractiveAssistant />
      </body>
    </html>
  );
}
