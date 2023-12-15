import { AppShellMain } from "@mantine/core"

import { Navbar } from "./navbar"
import { Shell } from "./shell"
import { Header } from "./header"

export function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<Shell>
			<Header />
			<Navbar />
			<AppShellMain>{children}</AppShellMain>
		</Shell>
	)
}
