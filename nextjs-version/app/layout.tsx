import type { Metadata } from "next";
import { Fraunces, Inter, Shantell_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const shantell = Shantell_Sans({
  subsets: ["latin"],
  variable: "--font-shantell",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ANRA Collective — A Pop-Up Portfolio",
  description:
    "A pop-up book of things we've built. Websites, platforms and campaigns — turn the pages gently, some of them pop.",
  openGraph: {
    title: "ANRA Collective — A Pop-Up Portfolio",
    description: "A pop-up book of things we've built. Turn the pages gently — some of them pop.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${shantell.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
