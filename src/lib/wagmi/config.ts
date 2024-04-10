import { env } from "@/env.mjs"
import { getDefaultConfig } from "connectkit"
import { http, cookieStorage, createConfig, createStorage } from "wagmi"
import { mainnet, rss3, rss3Sepolia, sepolia } from "wagmi/chains"
import { chains } from "./chain"

export const config = createConfig(
	getDefaultConfig({
		appName: "RSS3 Developer",
		appIcon: "/logo.svg",
		appDescription: "Buidl with RSS3",
		appUrl: "https://developer.rss3.io",
		walletConnectProjectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,

		chains: chains,
		ssr: true,
		storage: createStorage({
			storage: cookieStorage,
		}),
		transports: {
			[mainnet.id]: http(),
			[sepolia.id]: http(),
			[rss3.id]: http(),
			[rss3Sepolia.id]: http(),
		},
	}),
)

declare module "wagmi" {
	interface Register {
		config: typeof config
	}
}
