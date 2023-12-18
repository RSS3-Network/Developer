"use client"

import HistoryChart from "@/components/charts/history"
import { Group, Space } from "@mantine/core"
import { Delete } from "./_components/delete"
import { Settings } from "./_components/settings"
import { Title } from "./_components/title"

export default function Page({
	params,
}: {
	params: {
		id: number
	}
}) {
	const id = Number(params.id)

	return (
		<>
			<Group>
				<Title id={id} />
			</Group>

			<Space h="lg" />

			<HistoryChart id={id} />

			<Space h="lg" />

			<Settings id={id} />

			<Space h="lg" />

			<Delete id={id} />
		</>
	)
}
