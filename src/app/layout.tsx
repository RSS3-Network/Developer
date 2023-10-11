import "@/css/globals.css";
import "@mantine/core/styles.css";

import type { Metadata } from "next";
import { ColorSchemeScript } from "@mantine/core";
import Providers from "@/app/providers";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { TITLE, DESCRIPTION } from "@/lib/env";

const poppins = Poppins({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const OcrBStd = localFont({
  src: "../../public/fonts/OCR_B_Std_Regular.otf",
  variable: "--font-ocr-b-std",
});

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "RSS3",
    "RSS",
    "blockchain",
    "ethereum",
    "web3",
    "dapp",
    "crypto",
    "open web",
    "web activities",
    "AI",
    "search",
  ],
  themeColor: "#ffffff",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${OcrBStd.variable} scroll-smooth font-poppins`}
    >
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
