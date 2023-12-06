import "@/css/globals.css";
import "@/css/preflight.css";
import "@mantine/core/styles.css";

import type { Metadata } from "next";
import { ColorSchemeScript } from "@mantine/core";
import Providers from "@/app/providers";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import DashboardNav from "@/components/DashboardNav";
import { StickyNav } from "@/components/sticky-nav";
import { Toaster } from "react-hot-toast";
import {
  organization_jsonld,
  metadata as seoData,
  website_jsonld,
} from "@/utils/seo/generator";
import Script from "next/script";

const poppins = Poppins({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const OcrBStd = localFont({
  src: "../../public/fonts/OCR_B_Std_Regular.otf",
  variable: "--font-ocr-b-std",
});

export const metadata: Metadata = seoData;

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
        <Script
          id="website_jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(website_jsonld) }}
        ></Script>
        <Script
          id="organization_jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organization_jsonld),
          }}
        ></Script>
        <ColorSchemeScript />
      </head>
      <body>
        <div className="bg-blue-50 min-h-full flex flex-col">
          <Toaster />
          <Providers>
            <StickyNav theme="dark" />
            <div className="flex flex-1">
              <DashboardNav />
              <div className="flex-1 min-w-0">
                <div className="flex-1 min-w-0 bg-white w-full h-full overflow-y-auto p-8 relative">
                  {children}
                </div>
              </div>
            </div>
          </Providers>
        </div>
      </body>
    </html>
  );
}
