"use client"

import { NavLink } from "@mantine/core"
import {
	IconApps,
	IconBuildingBank,
	IconChartPie2,
	IconHome,
} from "@tabler/icons-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import classes from "./navbar-links.module.css"

type NavItem = {
	icon: React.ReactNode
	label: string
	href: string
	protected?: boolean
}

const navItems: NavItem[] = [
	{
		icon: <IconHome className={classes["nav-link-icon"]} stroke={1.5} />,
		label: "Home",
		href: "/",
	},
	{
		icon: <IconApps className={classes["nav-link-icon"]} stroke={1.5} />,
		label: "Apps",
		href: "/apps",
		protected: true,
	},
	{
		icon: <IconChartPie2 className={classes["nav-link-icon"]} stroke={1.5} />,
		label: "Analytics",
		href: "/analytics",
		protected: true,
	},
	{
		icon: (
			<IconBuildingBank className={classes["nav-link-icon"]} stroke={1.5} />
		),
		label: "Billing",
		href: "/billing",
		protected: true,
	},
]

export function NavbarLinks() {
	const pathname = usePathname()
	const { setOpen, isSignedIn } = useProtected()

	return navItems.map((item) => {
		const isActive = pathname === item.href
		return (
			<NavLink
				key={item.href}
				variant="filled"
				component={Link}
				href={item.href}
				classNames={{
					root: classes["nav-link-root"],
					label: classes["nav-link-label"],
				}}
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
	})
}

function useProtected() {
	// const { isSignedIn } = useSIWE();
	// const { setOpen } = useModal();
	return {
		isSignedIn: true,
		setOpen: (a: any) => {},
	}
}
