import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { InteractiveAssistant } from "@/components/InteractiveAssistant";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Election Compass",
  description: "A premium election journey assistant with timelines, tasking, and contextual guidance."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${display.variable} ${body.variable} antialiased bg-ink text-mist min-h-screen`}>
        <Navigation />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <InteractiveAssistant />
      </body>
    </html>
  );
}
