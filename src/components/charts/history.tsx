"use client"

import { useGetHistoryConsumption, useGetRu } from "@/data/gateway/hooks"
import { AreaChart } from "@mantine/charts"
import {
	Divider,
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

	const chartData =
		appHistory.data?.history
			.map((item) => ({
				date: new Date(item.consumption_date).toLocaleDateString(),
				requests: item.api_calls,
				ru: item.ru_used,
			}))
			.reverse() ?? []

	const totalRequestsInRange =
		appHistory.data?.history.reduce((acc, item) => acc + item.api_calls, 0) ?? 0
	const totalRuInRange =
		appHistory.data?.history.reduce((acc, item) => acc + item.ru_used, 0) ?? 0

	const ru = useGetRu()

	const totalRequests = ru.data?.api_calls_total ?? 0
	const totalRu = ru.data?.ru_used_total ?? 0

	return (
		<Stack>
			<Group>
				<Group>
					<StatItem
						label="Total Requests"
						value={totalRequests}
						isLoading={ru.isPending}
					/>
					<StatItem
						label="Total RU"
						tooltip="The RSS3 Unit is a computing unit that is directly used for billing."
						value={totalRu}
						isLoading={ru.isPending}
					/>
				</Group>
				<Group>
					<StatItem
						label="Requests This Epoch"
						tooltip="This will be settled when this epoch ends."
						value={totalRequestsInRange}
						isLoading={appHistory.isPending}
					/>
					<StatItem
						label="RU This Epoch"
						tooltip="The RSS3 Unit is a computing unit that is directly used for billing. This will be settled when this epoch ends."
						value={totalRuInRange}
						isLoading={appHistory.isPending}
					/>
				</Group>
			</Group>

			<Divider my="md" />

			<Group justify="space-between">
				<Group>
					<StatItem
						label="Requests In Range"
						value={totalRequestsInRange}
						isLoading={appHistory.isPending}
					/>
					<StatItem
						label="RU In Range"
						tooltip="The RSS3 Unit is a computing unit that is directly used for billing."
						value={totalRuInRange}
						isLoading={appHistory.isPending}
					/>
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

function StatItem({
	label,
	tooltip,
	value,
	isLoading,
}: { label: string; tooltip?: string; value: number; isLoading: boolean }) {
	return (
		<Stack gap="xs">
			<Group gap="xs">
				<Text>{label}</Text>
				{tooltip && (
					<Tooltip label={tooltip}>
						<IconExclamationCircle />
					</Tooltip>
				)}
			</Group>
			<Skeleton visible={isLoading}>
				<Text ff="monospace" fw="bold" size="lg">
					<NumberFormatter value={value} thousandSeparator />
				</Text>
			</Skeleton>
		</Stack>
	)
}
