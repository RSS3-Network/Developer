import { AppShellNavbar, AppShellSection } from "@mantine/core"
import classes from "./header.module.css"
import { NavbarFooter } from "./navbar-footer"
import { NavbarLinks } from "./navbar-links"

export function Navbar() {
	return (
		<AppShellNavbar classNames={{ navbar: classes.header }} withBorder={false}>
			<AppShellSection grow>
				<NavbarLinks />
			</AppShellSection>
			<AppShellSection>
				<NavbarFooter />
			</AppShellSection>
		</AppShellNavbar>
	)
}
