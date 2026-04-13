import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rhino Rock Mineral Wool | India's Greenest Insulation",
  description:
    "Forged in India\u2019s first electric smelter. Zero fossil fuels. Up to 65% lower CO\u2082. Premium rock mineral wool insulation for industrial, commercial, and residential applications. A Sarda Group venture.",
  keywords: [
    "rock mineral wool",
    "thermal insulation",
    "Rhino insulation",
    "green insulation India",
    "Sarda Group",
    "electric smelter",
    "zero fossil fuel insulation",
  ],
  openGraph: {
    title: "Rhino Rock Mineral Wool | India\u2019s Greenest Insulation",
    description:
      "Zero fossil fuels. Up to 65% lower CO\u2082. Premium rock mineral wool insulation by Sarda Group.",
    url: "https://www.rhinoinsulation.in",
    siteName: "Rhino Rock Mineral Wool",
    type: "website",
    locale: "en_IN",
  },
};

/**
 * Standalone layout for /home — hides the shared Header & Footer
 * rendered by the root layout so the page can render its own inline nav/footer
 * that matches the original Webflow site exactly.
 */
export default function HomeStandaloneLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {/* Hide the shared header/footer that the root layout always renders */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            #shared-header { display: none !important; }
            #shared-footer { display: none !important; }
          `,
        }}
      />
      {children}
    </>
  );
}
