"use client"

import { useGetHistoryConsumption } from "@/data/gateway/hooks"
import { AreaChart } from "@mantine/charts"
import {
	Group,
	LoadingOverlay,
	NumberFormatter,
	Skeleton,
	Stack,
	Text,
	TextInput,
	Tooltip,
} from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { IconExclamationCircle } from "@tabler/icons-react"
import { useEffect, useState } from "react"

export default function HistoryChart({ id }: { id?: string }) {
	const sevenDaysAgo = new Date()
	sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
	sevenDaysAgo.setHours(0, 0, 0, 0)
	const today = new Date()

	const [dateRangeValue, setDateRangeValue] = useState<
		[Date | null, Date | null]
	>([sevenDaysAgo, today])

	const appHistory = useGetHistoryConsumption({
		keyId: id,
		since: (dateRangeValue[0] ?? sevenDaysAgo).getTime(),
		until: (dateRangeValue[1] ?? today).getTime(),
	})

	const [chartData, setChartData] = useState<
		{
			date: string
			requests: number
			ru: number
		}[]
	>([])
	const [totalRequests, setTotalRequests] = useState(0)
	const [totalRu, setTotalRu] = useState(0)
	useEffect(() => {
		if (appHistory.data) {
			setChartData(
				appHistory.data.history
					.map((item) => ({
						date: new Date(item.consumption_date).toLocaleDateString(),
						requests: item.api_calls,
						ru: item.ru_used,
					}))
					.reverse(),
			)
			setTotalRequests(
				appHistory.data.history.reduce((acc, item) => acc + item.api_calls, 0),
			)
			setTotalRu(
				appHistory.data.history.reduce((acc, item) => acc + item.ru_used, 0),
			)
		}
	}, [appHistory.data])

	return (
		<Stack>
			<Group justify="space-between">
				<Group>
					<Stack gap="xs">
						<Text>Requests</Text>
						<Skeleton visible={appHistory.isPending}>
							<Text ff="monospace" fw="bold" size="lg">
								<NumberFormatter value={totalRequests} thousandSeparator />
							</Text>
						</Skeleton>
					</Stack>

					<Stack gap="xs">
						<Group>
							<Text>RU</Text>
							<Tooltip label="The RSS3 Unit is a computing unit that is directly used for billing.">
								<IconExclamationCircle />
							</Tooltip>
						</Group>
						<Skeleton visible={appHistory.isPending}>
							<Text ff="monospace" fw="bold" size="lg">
								<NumberFormatter value={totalRu} thousandSeparator />
							</Text>
						</Skeleton>
					</Stack>
				</Group>

				<DatePickerInput
					type="range"
					label="Select range"
					// placeholder="Select range"
					w={300}
					value={dateRangeValue}
					onChange={setDateRangeValue}
					clearable
					valueFormat="YYYY/MM/DD"
				/>
			</Group>

			<Skeleton visible={appHistory.isPending}>
				<AreaChart
					className="mt-4 h-72"
					data={chartData}
					dataKey="date"
					series={[
						{ name: "requests", color: "blue" },
						{ name: "ru", color: "cyan" },
					]}
				/>
			</Skeleton>
		</Stack>
	)
}
