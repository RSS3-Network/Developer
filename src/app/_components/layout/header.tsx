"use client"

import { ConnectButton } from "@/components/connect-button"
import Logo from "@/components/icons/Logo"
import { AppShellHeader, Burger, Group, Text } from "@mantine/core"
import Link from "next/link"
import { HeaderNav } from "./header-nav"
import classes from "./header.module.css"
import { useNavOpened } from "./store"

export function Header() {
	const [opened, setOpened] = useNavOpened()

	return (
		<AppShellHeader
			withBorder={false}
			classNames={{ header: classes.header }}
			px="lg"
		>
			<Group h="100%" justify="space-between">
				<Group h="100%">
					<Burger
						opened={opened}
						onClick={() => setOpened(!opened)}
						hiddenFrom="sm"
						size="sm"
					/>
					<Link href="/" style={{ color: "var(--mantine-color-text)" }}>
						<Group h="100%" gap="xs">
							<Logo size={30} />
							<Text span>Developer</Text>
						</Group>
					</Link>

					<Group>
						<HeaderNav />
					</Group>
				</Group>

				<ConnectButton connectText="Connect Wallet" size="sm" />
			</Group>
		</AppShellHeader>
	)
}
