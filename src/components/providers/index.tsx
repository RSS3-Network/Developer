import { JotaiProvider } from "@/lib/jotai"
import { MantineProvider } from "@/lib/mantine"
import { MotionProvider } from "@/lib/motion"
import { QueryProvider } from "@/lib/query"
import { WagmiProvider } from "@/lib/wagmi"
import { type PropsWithChildren } from "react"

export function Providers({ children }: PropsWithChildren<{}>) {
	return (
		<MantineProvider>
			<WagmiProvider>
				<QueryProvider>
					<JotaiProvider>
						<MotionProvider>{children}</MotionProvider>
					</JotaiProvider>
				</QueryProvider>
			</WagmiProvider>
		</MantineProvider>
	)
}
