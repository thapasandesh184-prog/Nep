import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nepovoxel — Premium AI Creative Studio",
  description:
    "AI-generated visuals, ad creatives, and world-class development — crafted with the precision of a royal atelier for the modern digital era.",
  keywords: [
    "AI creative studio",
    "AI product photography",
    "AI UGC video",
    "AI ad creatives",
    "Shopify brand creative",
    "Next.js development",
  ],
  openGraph: {
    title: "Nepovoxel — Premium AI Creative Studio",
    description:
      "AI-generated visuals, ad creatives, and world-class development — crafted with the precision of a royal atelier.",
    type: "website",
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
        className={`${cormorant.variable} ${dmSans.variable} antialiased bg-obsidian text-ivory font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
