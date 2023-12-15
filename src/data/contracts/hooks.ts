import { showNotification } from "@mantine/notifications"
import { useQueryClient } from "@tanstack/react-query"
import { type SIWESession, useSIWE } from "connectkit"
import { useEffect } from "react"
import {
	useContractRead,
	useContractWrite,
	usePrepareContractWrite,
	useWaitForTransaction,
} from "wagmi"
import { billingContract } from "./billing"
import { rss3Contract } from "./rss3"

function useAddress() {
	const { data } = useSIWE()
	return ((data as SIWESession)?.address ?? "0x0") as `0x${string}`
}

export function useDepositedRss3Balance() {
	const address = useAddress()
	const contractRead = useContractRead({
		address: billingContract.address,
		abi: billingContract.abi,
		functionName: "balanceOf",
		args: [address],
		watch: true,
	})

	return {
		tokenDecimals: billingContract.tokenDecimals,
		...contractRead,
	}
}

export function useRss3Balance() {
	const address = useAddress()
	const contractRead = useContractRead({
		address: rss3Contract.address,
		abi: rss3Contract.abi,
		functionName: "balanceOf",
		args: [address],
		watch: true,
	})

	return {
		tokenDecimals: rss3Contract.tokenDecimals,
		...contractRead,
	}
}

export function useRss3Allowance() {
	const address = useAddress()
	const contractRead = useContractRead({
		address: rss3Contract.address,
		abi: rss3Contract.abi,
		functionName: "allowance",
		args: [address, billingContract.address],
		watch: true,
	})

	return {
		tokenDecimals: rss3Contract.tokenDecimals,
		...contractRead,
	}
}

export function useRss3Approve(value: bigint) {
	const { config } = usePrepareContractWrite({
		address: rss3Contract.address,
		abi: rss3Contract.abi,
		functionName: "approve",
		args: [billingContract.address, value],
		enabled: value > 0n,
	})

	const contractWrite = useContractWrite({
		...config,
		onError(error) {
			showNotification({
				color: "red",
				title: "Approve failed",
				message: error.message,
			})
		},
	})
	const waitForTransaction = useWaitForTransaction({
		hash: contractWrite.data?.hash,
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
		contractWrite,
		waitForTransaction,
	}
}

export function useRss3Deposit(value: bigint) {
	const queryClient = useQueryClient()
	const { config } = usePrepareContractWrite({
		address: billingContract.address,
		abi: billingContract.abi,
		functionName: "deposit",
		args: [value],
		enabled: value > 0n,
	})

	const contractWrite = useContractWrite({
		...config,
		onError(error) {
			showNotification({
				color: "red",
				title: "Deposit failed",
				message: error.message,
			})
		},
	})
	const waitForTransaction = useWaitForTransaction({
		hash: contractWrite.data?.hash,
	})

	// on success
	useEffect(() => {
		if (waitForTransaction.isSuccess) {
			showNotification({
				color: "teal",
				title: "Deposit successful",
				message: "Your $RSS3 tokens have been deposited",
			})
			queryClient.invalidateQueries({
				queryKey: ["historyDeposit"],
			})
		}
	}, [waitForTransaction.isSuccess])

	return {
		contractWrite,
		waitForTransaction,
	}
}
