"use client"

import { ComponentProps } from "react"
// import { WagmiProvider as WagmiProvider_ } from "wagmi-v2";
// import { config } from "./config";

import { ConnectKitProvider } from "connectkit"

/////

import { env } from "@/env.mjs"
import { getDefaultConfig } from "connectkit"
import { WagmiConfig, createConfig as createConfigV1 } from "wagmi"
import { sepolia } from "wagmi/chains"
import { siweClient } from "./siwe"

const configV1 = createConfigV1(
	getDefaultConfig({
		alchemyId: env.NEXT_PUBLIC_ALCHEMY_ID,
		walletConnectProjectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
		appName: "RSS3 Developer",
		appDescription: "Build!",
		chains: [sepolia],
	}),
)

export function WagmiClientProvider({
	children,
	...props
}: Omit<ComponentProps<any>, "config">) {
	return (
		<WagmiConfig config={configV1}>
			<siweClient.Provider
				signOutOnAccountChange={true}
				signOutOnNetworkChange={false}
			>
				<ConnectKitProvider>{children}</ConnectKitProvider>
			</siweClient.Provider>
		</WagmiConfig>
	)
}
