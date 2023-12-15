"use client"

import { truncateAddress } from "@/lib/wagmi/utils"
import { Button } from "@mantine/core"
import { ConnectKitButton, useSIWE } from "connectkit"

export function ConnectButton({
	connectText = "Connect Wallet",
	size = "lg",
}: {
	connectText?: string
	size?: "xs" | "sm" | "md" | "lg" | "xl"
}) {
	const { isSignedIn, data } = useSIWE()

	return (
		<ConnectKitButton.Custom>
			{({ isConnected, show, truncatedAddress, ensName }) => {
				return (
					<Button onClick={show} size={size}>
						{isSignedIn
							? truncateAddress(data?.address as `0x${string}`)
							: connectText}
					</Button>
				)
			}}
		</ConnectKitButton.Custom>
	)
}
