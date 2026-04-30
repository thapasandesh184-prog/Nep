import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
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
  title: "Nepovoxel — Fly Through the AI Dimension",
  description:
    "You do not scroll a website. You fly through a living AI dimension. Nepovoxel is an AI creative studio whose website IS an AI-generated universe.",
  keywords: [
    "AI creative studio",
    "AI product photography",
    "AI UGC video",
    "3D web experience",
    "award winning website",
    "immersive web",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Nepovoxel — Fly Through the AI Dimension",
    description: "A navigable 3D dimension that generates itself around you.",
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
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-[#08070A] text-[#F2EFF9] font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
