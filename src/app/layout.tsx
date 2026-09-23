import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/common/CustomCursor";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khổng Đức Chính | Frontend Developer ✦ 3D Universe Portfolio",
  description:
    "Khổng Đức Chính — Frontend Developer at TDT Asia. Specializing in React, Next.js, TypeScript, Webflow, and enterprise fintech applications.",
  keywords: [
    "Khổng Đức Chính",
    "Khong Duc Chinh",
    "Frontend Developer",
    "TDT Asia",
    "React Developer",
    "Next.js Specialist",
    "TypeScript",
    "Webflow Developer",
    "3D Portfolio",
    "Hà Nội",
    "Vietnam"
  ],
  authors: [{ name: "Khổng Đức Chính" }],
  creator: "Khổng Đức Chính",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chinh-universe.dev",
    title: "Khổng Đức Chính | Frontend Developer ✦ 3D Universe",
    description:
      "Explore the 3D developer universe of Khổng Đức Chính — Frontend Developer at TDT Asia.",
    siteName: "Khổng Đức Chính's Developer Universe",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#030014",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${outfit.variable} dark scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="custom-cursor-active bg-[#030014] text-slate-100 antialiased selection:bg-purple-600/30 selection:text-cyan-200"
        suppressHydrationWarning
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
