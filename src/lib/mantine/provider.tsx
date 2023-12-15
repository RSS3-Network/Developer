import { MantineProvider as MantineProvider_ } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { type PropsWithChildren } from "react"

import { ColorSchemeSwitchIndicator } from "./color-scheme-switch"
import { NotificationsProvider } from "./notifications"
import { ScreenIndicator } from "./screen-indicator"
import { theme } from "./theme"
import { TitleIndicator } from "./title-indicator"

export function MantineProvider({ children }: PropsWithChildren<{}>) {
	const DevTools = () =>
		process.env.NODE_ENV === "production" ? null : (
			<>
				<ColorSchemeSwitchIndicator />
				<ScreenIndicator />
				<TitleIndicator />
			</>
		)

	return (
		<MantineProvider_ defaultColorScheme="auto" theme={theme}>
			<ModalsProvider>
				<NotificationsProvider>{children}</NotificationsProvider>
			</ModalsProvider>

			<DevTools />
		</MantineProvider_>
	)
}
