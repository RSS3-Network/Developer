"use client"

import { AppShell } from "@mantine/core"
import { useNavOpened } from "./store"

export function Shell({ children }: { children: React.ReactNode }) {
	const [opened] = useNavOpened()

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
			padding="md"
		>
			{children}
		</AppShell>
	)
}
