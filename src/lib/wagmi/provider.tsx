"use client"

import { config } from "./config"

import { ConnectKitProvider } from "connectkit"

import { WagmiProvider as WagmiProvider_, cookieToInitialState } from "wagmi"
import { siweClient } from "./siwe"

export function WagmiProvider({
	children,
	cookie,
}: {
	children: React.ReactNode
	cookie?: string | null
}) {
	const initialState = cookieToInitialState(config, cookie)
	return (
		<WagmiProvider_ config={config} initialState={initialState}>
			<siweClient.Provider
				signOutOnAccountChange={true}
				signOutOnNetworkChange={false}
			>
				<ConnectKitProvider>{children}</ConnectKitProvider>
			</siweClient.Provider>
		</WagmiProvider_>
	)
}
