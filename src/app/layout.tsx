import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nepovoxel.com"),
  title: "Nepovoxel — AI Creative Studio",
  description:
    "AI-generated product photography, UGC videos, ad creatives, and world-class web development. Studio-quality visuals at a fraction of the cost.",
  keywords: [
    "AI creative studio",
    "AI product photography",
    "AI UGC video",
    "AI ad creatives",
    "web development",
    "Next.js",
    "brand visuals",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Nepovoxel — AI Creative Studio",
    description: "Studio-quality AI visuals and web development for ambitious brands.",
    type: "website",
    locale: "en_US",
    siteName: "Nepovoxel",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${inter.variable} antialiased bg-[#08070A] text-[#F2EFF9] font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
