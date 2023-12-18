"use client"

import { Container } from "@mantine/core"
import { useSIWE } from "connectkit"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const router = useRouter()
	const { isSignedIn } = useSIWE()

	useEffect(() => {
		if (!isSignedIn) {
			router.push("/")
		}
	}, [isSignedIn, router])

	return <Container>{children}</Container>
}
