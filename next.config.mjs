import { env } from "./src/env.mjs";

import million from "million/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.externals.push("pino-pretty", "lokijs", "encoding");
		return config;
	},
	async rewrites() {
		const endpoint = {
			development: "payment.rss3.dev",
			test: "payment.rss3.dev",
			prod: "payment.rss3.io",
		}[env.NEXT_PUBLIC_ENV];

		return [
			{
				source: "/api/gateway/:path*",
				destination: `https://${endpoint}/:path*`,
			},
		];
	},
	experimental: {
		optimizePackageImports: [
			"@mantine/core",
			"@mantine/hooks",
			"@tabler/icons-react",
		],
	},
};

/** @type {Parameters<million['next']>[1]} */
const millionConfig = {
	auto: { rsc: true },
};

export default million.next(nextConfig, millionConfig);
