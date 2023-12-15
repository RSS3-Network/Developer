import { Notifications } from "@mantine/notifications"
import { PropsWithChildren } from "react"

export function NotificationsProvider({ children }: PropsWithChildren) {
	return (
		<>
			<Notifications />
			{children}
		</>
	)
}
