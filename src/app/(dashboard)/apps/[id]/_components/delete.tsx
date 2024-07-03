"use client"

import { useDeleteKey, useGetKey } from "@/data/gateway/hooks"
import { Button, Input, Text, Title } from "@mantine/core"
import { closeAllModals, openModal } from "@mantine/modals"
import { showNotification } from "@mantine/notifications"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

function DeleteConfirmation({
	id,
	onSuccess,
}: { id: string; onSuccess?: () => void }) {
	const deleteKey = useDeleteKey()
	const router = useRouter()
	const key = useGetKey({ id })

	const [value, setValue] = useState("")

	return (
		<div>
			<Text size="sm">
				Once you delete your app, there is no way to undo it. Please type the
				name of your app{" "}
				<span className="font-mono font-bold">{key.data?.name}</span> to
				confirm.
			</Text>
			<Input
				mt="sm"
				placeholder={key.data?.name}
				value={value}
				onChange={(event) => setValue(event.currentTarget.value)}
			/>

			<Button
				color="red"
				mt="md"
				onClick={() => {
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
								onSuccess?.()
							},
						},
					)
				}}
				loading={deleteKey.isPending}
				disabled={value !== key.data?.name}
			>
				Confirm Deletion
			</Button>
		</div>
	)
}

export function Delete({ id }: { id: string }) {
	const handleDelete = useCallback(() => {
		openModal({
			centered: true,
			title: "Please confirm your action",
			children: (
				<DeleteConfirmation id={id} onSuccess={() => closeAllModals()} />
			),
		})
	}, [id])

	return (
		<>
			<Title order={3}>Delete</Title>

			<Text mt="md" c="dimmed">
				Click the button below to delete your app forever.
			</Text>

			<Button mt="md" color="red" onClick={handleDelete}>
				Delete
			</Button>
		</>
	)
}
