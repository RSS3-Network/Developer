import { JotaiProvider } from "@/lib/jotai"
import { MantineProvider } from "@/lib/mantine"
import { MotionProvider } from "@/lib/motion"
import { QueryProvider } from "@/lib/query"
import { WagmiProvider } from "@/lib/wagmi"
import { headers } from "next/headers"
import { type PropsWithChildren } from "react"

export function Providers({ children }: PropsWithChildren<{}>) {
	return (
		<QueryProvider>
			<MantineProvider>
				<WagmiProvider cookie={headers().get("cookie")}>
					<JotaiProvider>
						<MotionProvider>{children}</MotionProvider>
					</JotaiProvider>
				</WagmiProvider>
			</MantineProvider>
		</QueryProvider>
	)
}
