import { env } from "./src/env.mjs"

import million from "million/compiler"

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.externals.push("pino-pretty", "lokijs", "encoding")
		return config
	},
	async rewrites() {
		return [
			{
				source: "/api/gateway/:path*",
				destination: `https://gateway.${
					env.NEXT_PUBLIC_ENV === "dev"
						? "dev."
						: env.NEXT_PUBLIC_ENV === "staging"
						  ? "staging."
						  : ""
				}rss3.io/:path*`,
			},
		]
	},
	experimental: {
		optimizePackageImports: [
			"@mantine/core",
			"@mantine/hooks",
			"@tabler/icons-react",
		],
	},
}

/** @type {Parameters<million['next']>[1]} */
const millionConfig = {
	auto: { rsc: true },
}

export default million.next(nextConfig, millionConfig)
