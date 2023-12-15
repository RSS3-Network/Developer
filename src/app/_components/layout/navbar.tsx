"use client"

import { AppShellNavbar, NavLink } from "@mantine/core"
import {
	IconApps,
	IconBuildingBank,
	IconChartPie2,
	IconHome,
} from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import classes from "./navbar.module.css"

type NavItem = {
	icon: React.ReactNode
	label: string
	href: string
	protected?: boolean
}

const navItems: NavItem[] = [
	{
		icon: <IconHome size="1rem" stroke={1.5} />,
		label: "Home",
		href: "/",
	},
	{
		icon: <IconApps size="1rem" stroke={1.5} />,
		label: "Apps",
		href: "/apps",
		protected: true,
	},
	{
		icon: <IconChartPie2 size="1rem" stroke={1.5} />,
		label: "Analytics",
		href: "/analytics",
		protected: true,
	},
	{
		icon: <IconBuildingBank size="1rem" stroke={1.5} />,
		label: "Billing",
		href: "/billing",
		protected: true,
	},
]

export function Navbar() {
	const pathname = usePathname()
	const { setOpen, isSignedIn } = useProtected()

	return (
		<AppShellNavbar
			p="md"
			classNames={{
				navbar: classes.navbar,
			}}
			withBorder={false}
		>
			{navItems.map((item) => {
				const isActive = pathname === item.href
				return (
					<NavLink
						// classNames={{
						//   label: "text-xl",
						// }}
						key={item.href}
						variant="filled"
						component={Link}
						href={item.href}
						className="rounded-md"
						label={item.label}
						leftSection={item.icon}
						active={isActive}
						onClick={(e) => {
							if (item.protected && !isSignedIn) {
								e.preventDefault()
								setOpen(true)
							}
						}}
					/>
				)
			})}
		</AppShellNavbar>
	)
}

function useProtected() {
	// const { isSignedIn } = useSIWE();
	// const { setOpen } = useModal();
	return {
		isSignedIn: true,
		setOpen: (a: any) => {},
	}
}
