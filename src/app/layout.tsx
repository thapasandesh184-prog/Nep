import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/smooth-scroll";
import CustomCursor from "@/components/custom-cursor";
import SchemaMarkup from "@/components/schema-markup";

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
  metadataBase: new URL("https://nepovoxel.com"),
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
    "AI generated product images",
    "e-commerce creative agency",
  ],
  authors: [{ name: "Nepovoxel" }],
  creator: "Nepovoxel",
  publisher: "Nepovoxel",
  robots: "index, follow",
  openGraph: {
    title: "Nepovoxel — Premium AI Creative Studio",
    description:
      "AI-generated visuals, ad creatives, and world-class development — crafted with the precision of a royal atelier.",
    type: "website",
    locale: "en_US",
    siteName: "Nepovoxel",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nepovoxel — Premium AI Creative Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nepovoxel — Premium AI Creative Studio",
    description:
      "AI-generated visuals, ad creatives, and world-class development.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://nepovoxel.com",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <SchemaMarkup />
      </head>
      <body
        className={`${cormorant.variable} ${dmSans.variable} antialiased bg-obsidian text-ivory font-sans`}
      >
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
