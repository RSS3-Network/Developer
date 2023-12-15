import "@/css/globals.css"

import type { Metadata } from "next"
import {
	organization_jsonld,
	metadata as seoData,
	website_jsonld,
} from "@/utils/seo/generator"
import Script from "next/script"
import { Providers } from "@/components/providers"
import { ColorSchemeScript } from "@/lib/mantine"
import { RootLayout } from "./_components/layout"

export const metadata: Metadata = seoData

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
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
				<Providers>
					<RootLayout>{children}</RootLayout>
				</Providers>
			</body>
		</html>
	)
}
