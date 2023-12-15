import { env } from "@/env.mjs"
import { mainnet, sepolia } from "viem/chains"

export const getChain = () => {
	switch (env.NEXT_PUBLIC_ENV) {
		case "dev":
			return sepolia
		case "staging":
			return sepolia
		default:
			return mainnet
	}
}
