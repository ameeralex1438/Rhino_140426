import type { Metadata } from "next";
import { inter, spaceGrotesk, jetbrainsMono } from "@/lib/fonts";
import { LenisProvider } from "@/lib/lenis-provider";
import { GsapProvider } from "@/lib/gsap-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
// import { PageLoader } from "@/components/ui/page-loader";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "Rhino Rock Mineral Wool | India's Greenest Insulation",
    template: "%s | Rhino Rock Mineral Wool",
  },
  description:
    "Forged in India's first electric smelter. Zero fossil fuels. Up to 65% lower CO\u2082. Premium rock mineral wool insulation for industrial, commercial, and residential applications. A Sarda Group venture.",
  keywords: [
    "rock mineral wool",
    "thermal insulation",
    "fire resistant insulation",
    "acoustic insulation",
    "green insulation India",
    "Rhino insulation",
    "Sarda Group",
    "electric smelter",
    "zero fossil fuel insulation",
    "sustainable building materials",
    "eco friendly insulation",
  ],
  authors: [{ name: "Sarda Metals & Alloys Ltd." }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.rhinoinsulation.in",
    siteName: "Rhino Rock Mineral Wool",
    title: "Rhino Rock Mineral Wool | India\u2019s Greenest Insulation",
    description:
      "Zero fossil fuels. Up to 65% lower CO\u2082. Premium rock mineral wool insulation by Sarda Group.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rhino Rock Mineral Wool | India\u2019s Greenest Insulation",
    description:
      "Zero fossil fuels. Up to 65% lower CO\u2082. Premium rock mineral wool insulation by Sarda Group.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, spaceGrotesk.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-screen bg-[#f2f2f2] text-[#111111] antialiased" suppressHydrationWarning>
        <GsapProvider />
        <CustomCursor />
        {/* PageLoader removed — was causing navigation glitches */}
        <LenisProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </LenisProvider>
      </body>
    </html>
  );
}
