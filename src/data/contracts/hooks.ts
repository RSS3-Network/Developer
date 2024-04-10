import { rss3Chain } from "@/lib/wagmi/chain"
import { showNotification } from "@mantine/notifications"
import { useQueryClient } from "@tanstack/react-query"
import { type SIWESession, useSIWE } from "connectkit"
import { useEffect } from "react"
import {
	type Register,
	useAccount,
	useSwitchChain,
	useWaitForTransactionReceipt,
} from "wagmi"
import {
	billingAddress,
	useReadBillingBalanceOf,
	useReadRss3TokenAllowance,
	useReadRss3TokenBalanceOf,
	useSimulateBillingDeposit,
	useSimulateRss3TokenApprove,
	useWriteBillingDeposit,
	useWriteRss3TokenApprove,
} from "./hooks/core"

function useAddress() {
	const { data } = useSIWE()
	return ((data as SIWESession)?.address ?? "0x0") as `0x${string}`
}

function useSwitchCorrectChain({
	targetChainId,
}: { targetChainId: Register["config"]["chains"][number]["id"] }) {
	const { chainId } = useAccount()
	const switchChain = useSwitchChain()
	return {
		chainId,
		switchCorrectChain: () => {
			switchChain.switchChain({ chainId: targetChainId })
		},
	}
}

export function useDepositedRss3Balance() {
	const address = useAddress()
	const contractRead = useReadBillingBalanceOf({
		args: [address],
	})

	return contractRead
}

export function useRss3Balance() {
	const address = useAddress()
	const contractRead = useReadRss3TokenBalanceOf({
		args: [address],
	})

	return contractRead
}

export function useRss3Allowance() {
	const address = useAddress()
	const contractRead = useReadRss3TokenAllowance({
		args: [address, billingAddress[rss3Chain.id]],
	})

	return contractRead
}

export function useRss3Approve(value: bigint) {
	const simulate = useSimulateRss3TokenApprove({
		args: [billingAddress[rss3Chain.id], value],
		query: {
			enabled: value > 0n,
			retry: false,
		},
	})

	const contractWrite = useWriteRss3TokenApprove({
		mutation: {
			onError: (error) => {
				showNotification({
					color: "red",
					title: "Approve failed",
					message: error.message,
				})
			},
		},
	})

	const waitForTransaction = useWaitForTransactionReceipt({
		hash: contractWrite.data,
	})

	// on success
	useEffect(() => {
		if (waitForTransaction.isSuccess) {
			showNotification({
				color: "teal",
				title: "Approve successful",
				message: "Your $RSS3 tokens have been approved",
			})
		}
	}, [waitForTransaction.isSuccess])

	return {
		simulate,
		contractWrite,
		waitForTransaction,
	}
}

export function useRss3Deposit(value: bigint) {
	const simulate = useSimulateBillingDeposit({
		args: [value],
		query: {
			enabled: value > 0n,
			retry: false,
		},
	})

	const contractWrite = useWriteBillingDeposit({
		mutation: {
			onError: (error) => {
				showNotification({
					color: "red",
					title: "Deposit failed",
					message: error.message,
				})
			},
		},
	})

	const waitForTransaction = useWaitForTransactionReceipt({
		hash: contractWrite.data,
	})

	// on success
	const queryClient = useQueryClient()
	const rss3Balance = useRss3Balance()
	const depositedRss3Balance = useDepositedRss3Balance()
	useEffect(() => {
		if (waitForTransaction.isSuccess) {
			showNotification({
				color: "teal",
				title: "Deposit successful",
				message: "Your $RSS3 tokens have been deposited",
			})
			queryClient.invalidateQueries({ queryKey: ["historyDeposit"] })
			queryClient.invalidateQueries({ queryKey: rss3Balance.queryKey })
			queryClient.invalidateQueries({ queryKey: depositedRss3Balance.queryKey })
		}
	}, [
		depositedRss3Balance.queryKey,
		queryClient,
		rss3Balance.queryKey,
		waitForTransaction.isSuccess,
	])

	return {
		simulate,
		contractWrite,
		waitForTransaction,
	}
}
