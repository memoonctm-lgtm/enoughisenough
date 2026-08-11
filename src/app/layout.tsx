import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ContentProvider } from "@/lib/content-store";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Enough Is Enough Foundation",
    template: "%s | Enough Is Enough Foundation",
  },
  description:
    "Empowering individuals through faith-based life coaching, mentorship, and transformative community programs. Lift you up and walk into your destiny.",
  keywords: [
    "life coaching",
    "faith-based",
    "community support",
    "Enough Is Enough Foundation",
    "Sharon Bedford",
    "Men Of Hope",
    "Women Of Destiny",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ContentProvider>{children}</ContentProvider>
      </body>
    </html>
  );
}
