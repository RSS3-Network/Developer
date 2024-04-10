import { env } from "@/env.mjs"
import { mainnet, rss3, rss3Sepolia, sepolia } from "wagmi/chains"

export const rss3Chain =
	env.NEXT_PUBLIC_ENV === "production" ? rss3 : rss3Sepolia
export const mainnetChain =
	env.NEXT_PUBLIC_ENV === "production" ? mainnet : sepolia

export const chains = [rss3Chain, mainnetChain] as const
