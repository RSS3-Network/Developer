import { env } from "@/env.mjs"
import { erc20ABI } from "wagmi"

export const rss3Contract = {
	get address() {
		switch (env.NEXT_PUBLIC_ENV) {
			case "dev":
				return "0xD892F9f0eea6F6a586aaba7ed895a6eb4Fa754d0"
			case "staging":
				return "0x016aB32365d45B275891e349C877391F10862067"
			default:
				return "0x0"
		}
	},

	tokenDecimals: 18,

	abi: erc20ABI,
} as const
