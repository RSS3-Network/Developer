// import { headers } from "next/headers";

// import { config } from "./config";
import { WagmiClientProvider } from "./provider.client"
// import { cookieToInitialState } from "wagmi-v2";

/**
 * Should be placed outside tanstack query provider
 */
export function WagmiProvider({ children }: { children: React.ReactNode }) {
	// const initialState = cookieToInitialState(config, headers().get("cookie"));

	return <WagmiClientProvider>{children}</WagmiClientProvider>
}
