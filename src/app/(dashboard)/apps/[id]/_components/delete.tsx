"use client"

import { useDeleteKey } from "@/data/gateway/hooks"
import { Alert, Button, Text, Title } from "@mantine/core"
import { openConfirmModal } from "@mantine/modals"
import { showNotification } from "@mantine/notifications"
import { IconAlertCircleFilled } from "@tabler/icons-react"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

export function Delete({ id }: { id: number }) {
	const deleteKey = useDeleteKey()
	const router = useRouter()

	const handleDelete = useCallback(() => {
		openConfirmModal({
			centered: true,
			title: "Please confirm your action",
			children: (
				<Text size="sm">
					Once you delete your app, there is no way to undo it. Please make sure
					you are certain before proceeding.
				</Text>
			),
			confirmProps: {
				color: "red",
			},
			labels: { confirm: "Yes! Delete It!", cancel: "Cancel" },
			onConfirm: () => {
				deleteKey.mutate(
					{ id },
					{
						onError: (error, variables, context) => {
							showNotification({
								color: "red",
								title: "Error",
								message: error.message,
							})
						},
						onSuccess: () => {
							router.push("/apps")
						},
					},
				)
			},
		})
	}, [id, router, deleteKey])

	return (
		<>
			<Title order={3}>Delete</Title>
			{/*
      <Alert
        variant="light"
        color="red"
        title="Danger"
        icon={<IconAlertCircleFilled />}
      >
        Once you delete your app, there is no way to undo it. Please make sure
        you are certain before proceeding.
      </Alert> */}

			<Text mt="md" c="dimmed">
				Click the button below to delete your app forever.
			</Text>

			<Button
				mt="md"
				color="red"
				onClick={handleDelete}
				loading={deleteKey.isPending}
			>
				Delete
			</Button>
		</>
	)
}
