// https://env.t3.gg/docs/nextjs

import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
	client: {
		NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: z.string().min(1),
		NEXT_PUBLIC_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID:
			process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
		NEXT_PUBLIC_ALCHEMY_ID: process.env.NEXT_PUBLIC_ALCHEMY_ID,
	},
	server: {
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
	},
})
