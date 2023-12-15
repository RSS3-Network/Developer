"use client"

import HistoryTable from "@/components/HistoryTable"
import {
	useGetHistoryCollection,
	useGetHistoryDeposit,
	useGetHistoryWithdrawal,
} from "@/data/gateway/hooks"
import { Stack, Title } from "@mantine/core"

export function Records() {
	return (
		<Stack>
			<Stack gap="xs">
				<Title order={4}>Billing History</Title>
				<HistoryTable requestFunction={useGetHistoryCollection} />
			</Stack>
			<Stack gap="xs">
				<Title order={4}>Deposit History</Title>
				<HistoryTable requestFunction={useGetHistoryDeposit} />
			</Stack>
			<Stack gap="xs">
				<Title order={4}>Withdrawal History</Title>
				<HistoryTable requestFunction={useGetHistoryWithdrawal} />
			</Stack>
		</Stack>
	)
}
