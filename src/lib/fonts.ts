import { Montserrat, JetBrains_Mono } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Montserrat serves as both body and display font (matching the live site)
export const inter = montserrat; // alias for backward compat
export const spaceGrotesk = montserrat; // alias for backward compat

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
