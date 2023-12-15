"use client"

import { BreadcrumbsTitle } from "@/components/breadcrumbs"
import HistoryChart from "@/components/charts/history"
import { useGetKey } from "@/data/gateway/hooks"
import { Group, Space } from "@mantine/core"
import { Delete } from "./_components/delete"
import { Settings } from "./_components/settings"

export default function Page({
	params,
}: {
	params: {
		id: number
	}
}) {
	const id = Number(params.id)
	const info = useGetKey({ id })

	return (
		<>
			<Group>
				<BreadcrumbsTitle
					items={[
						{ href: "/apps", label: "Apps" },
						{ href: `/apps/${id}`, label: info.data?.name ?? "..." },
					]}
				/>
			</Group>

			<Space h="lg" />

			<HistoryChart id={id} />

			<Space h="lg" />

			<Settings id={id} name={info.data?.name} passkey={info.data?.key} />

			<Space h="lg" />

			<Delete id={id} />
		</>
	)
}
