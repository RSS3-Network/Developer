"use client"

import { rss3Chain } from "@/lib/wagmi/chain"
import { showNotification } from "@mantine/notifications"
import { useQueryClient } from "@tanstack/react-query"
import { type SIWESession, useSIWE } from "connectkit"
import { useEffect } from "react"
import {
	type Register,
	type UseSimulateContractReturnType,
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

export function useSwitchCorrectChain({
	chainId,
}: {
	chainId: Register["config"]["chains"][number]["id"]
}) {
	const { chainId: currentChainId } = useAccount()
	const switchChain = useSwitchChain()
	const isCorrectChain = currentChainId === chainId
	return {
		...switchChain,
		data: isCorrectChain,
		switchChain: () => switchChain.switchChain({ chainId }),
		switchChainAsync: () => switchChain.switchChainAsync({ chainId }),
	}
}

export function useCheckSimulateBeforeWriteContract({
	simulate,
}: {
	simulate: any // TODO: fix this type
}) {
	const _simulate = simulate as UseSimulateContractReturnType

	const check = () => {
		if (!Boolean(_simulate.data?.request)) {
			console.error(_simulate.error)
			if (_simulate.error) {
				openSimulateErrorModal({ error: _simulate.error })
			}
			return false
		}

		return true
	}

	return {
		check,
	}
}

export function useDepositedRss3Balance() {
	const address = useAddress()
	const contractRead = useReadBillingBalanceOf({
		chainId: rss3Chain.id,
		args: [address],
	})

	return contractRead
}

export function useRss3Balance() {
	const address = useAddress()
	const contractRead = useReadRss3TokenBalanceOf({
		chainId: rss3Chain.id,
		args: [address],
	})

	return contractRead
}

export function useRss3Allowance() {
	const address = useAddress()
	const contractRead = useReadRss3TokenAllowance({
		chainId: rss3Chain.id,
		args: [address, billingAddress[rss3Chain.id]],
	})

	return contractRead
}

export function useRss3Approve(value: bigint) {
	const simulate = useSimulateRss3TokenApprove({
		chainId: rss3Chain.id,
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
		query: {
			enabled: Boolean(contractWrite.data),
		},
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
		chainId: rss3Chain.id,
		value,
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

	const checkSimulate = useCheckSimulateBeforeWriteContract({
		simulate,
	})

	const waitForTransaction = useWaitForTransactionReceipt({
		hash: contractWrite.data,
		query: {
			enabled: Boolean(contractWrite.data),
		},
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
		// depositedRss3Balance.queryKey,
		// queryClient,
		// rss3Balance.queryKey,
		waitForTransaction.isSuccess,
	])

	return {
		simulate,
		checkSimulate,
		contractWrite,
		waitForTransaction,
	}
}

////////

import { ContractFunctionExecutionError } from "viem"

import { Spoiler, Text } from "@mantine/core"
import { openModal } from "@mantine/modals"

export function openSimulateErrorModal({
	error,
}: {
	error: NonNullable<UseSimulateContractReturnType["error"]>
}) {
	return openModal({
		title: "Contract Error: " + error.name,
		children: (
			<>
				<Text my="md">
					❌ The contract call is failed with the following error message. You
					may need to check your input. If you think this is a bug, please
					report it to us.
				</Text>

				{error instanceof ContractFunctionExecutionError ? (
					<ContractFunctionExecutionErrorDisplay error={error} />
				) : null}

				<Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
					<b>Even More Details:</b>
					<Text
						component="pre"
						size="xs"
						className="whitespace-pre-wrap break-all"
					>
						{error.message}
					</Text>
				</Spoiler>
			</>
		),
		size: "lg",
	})
}

function ContractFunctionExecutionErrorDisplay({
	error,
}: {
	error: ContractFunctionExecutionError
}) {
	return (
		<>
			<Text my="md">
				<b>Short Message</b>: {error.shortMessage}
			</Text>

			<Text my="md">
				<b>Details</b>: {error.details}
			</Text>
		</>
	)
}
