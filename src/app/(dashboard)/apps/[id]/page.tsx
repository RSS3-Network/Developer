import { BreadcrumbsTitle } from "@/components/breadcrumbs"
import HistoryChart from "@/components/charts/history"
import { getKey } from "@/data/gateway/api"
import { qk_getKey } from "@/data/gateway/hooks"
import { Group, Space } from "@mantine/core"
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query"
import { notFound } from "next/navigation"
import { Delete } from "./_components/delete"
import { Settings } from "./_components/settings"
import { Title } from "./_components/title"

export default async function Page({
	params,
}: {
	params: {
		id: number
	}
}) {
	const id = Number(params.id)
	// const info = useGetKey({ id })

	try {
		const queryClient = new QueryClient()

		await queryClient.fetchQuery({
			queryKey: qk_getKey({ id }),
			queryFn: () => getKey({ id }),
		})

		return (
			<HydrationBoundary state={dehydrate(queryClient)}>
				<Title id={id} />

				<Space h="lg" />

				<HistoryChart id={id} />

				<Space h="lg" />

				<Settings id={id} />

				<Space h="lg" />

				<Delete id={id} />
			</HydrationBoundary>
		)
	} catch (error) {
		notFound()
	}
}
