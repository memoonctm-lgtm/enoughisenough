import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { ContentProvider } from "@/lib/content-store";

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
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
    <html lang="en" className={`${sourceSans.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background font-sans text-foreground">
        <ContentProvider>{children}</ContentProvider>
      </body>
    </html>
  );
}
