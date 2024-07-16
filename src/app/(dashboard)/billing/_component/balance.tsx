"use client"

import { BalanceInput } from "@/components/balance-input"
import {
	useDepositedRss3Balance,
	useRss3Allowance,
	useRss3Balance,
	useRss3Deposit,
	useSwitchCorrectChain,
} from "@/data/contracts/hooks"
import {
	useCancelRequestWithdrawal,
	useGetCurrentRequestWithdrawal,
	useRequestWithdrawal,
} from "@/data/gateway/hooks"
import { rss3Chain } from "@/lib/wagmi/chain"
import {
	Anchor,
	Button,
	Divider,
	Group,
	Modal,
	NumberFormatter,
	Stack,
	Text,
	Tooltip,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { openConfirmModal } from "@mantine/modals"
import { IconExclamationCircle } from "@tabler/icons-react"
import { valibotResolver } from "mantine-form-valibot-resolver"
import { useCallback, useEffect, useMemo, useState } from "react"
import * as v from "valibot"
import { formatUnits, parseUnits } from "viem"

export function Balance() {
	const depositedRss3 = useDepositedRss3Balance()
	const rss3 = useRss3Balance()

	return (
		<Stack>
			<Group>
				<Stack gap="xs">
					<Group gap="xs">
						<Text c="dimmed">Balance</Text>
						<Tooltip label="Your $RSS3 balance is used to cover request fees. You can withdraw them at any time.">
							<Text c="dimmed">
								<IconExclamationCircle />
							</Text>
						</Tooltip>
					</Group>
					<Text size="xl" fw="bold" ff="monospace">
						<NumberFormatter
							thousandSeparator
							value={formatUnits(depositedRss3.data ?? 0n, 18)}
						/>
					</Text>
				</Stack>

				<Divider orientation="vertical" />

				<Stack gap="xs">
					<Text c="dimmed">$RSS3</Text>
					<Text size="xl" fw="bold" ff="monospace">
						<NumberFormatter
							thousandSeparator
							value={formatUnits(rss3.data ?? 0n, 18)}
						/>
					</Text>
				</Stack>
			</Group>

			<Actions />
		</Stack>
	)
}

function Actions() {
	return (
		<Group>
			<ActionButton Modal={DepositModal}>Deposit</ActionButton>
			<ActionButton Modal={WithdrawModal}>Withdraw</ActionButton>
		</Group>
	)
}

function ActionButton({
	Modal,
	children,
}: {
	Modal: ({
		opened,
		onClose,
	}: {
		opened: boolean
		onClose: () => void
	}) => React.ReactNode
	children: React.ReactNode
}) {
	const [opened, setOpened] = useState(false)

	const handleOpen = useCallback(() => {
		setOpened(true)
	}, [])

	const handleClose = useCallback(() => {
		setOpened(false)
	}, [])

	return (
		<>
			<Button onClick={handleOpen}>{children}</Button>

			<Modal opened={opened} onClose={handleClose} />
		</>
	)
}

function DepositModal({
	opened,
	onClose,
}: {
	opened: boolean
	onClose: () => void
}) {
	const rss3 = useRss3Balance()
	const maxBalance = parseFloat(formatUnits(rss3.data ?? 0n, 18))

	const formSchema = useMemo(
		() =>
			v.object({
				amount: v.pipe(
					v.number(),
					v.minValue(0),
					v.maxValue(
						maxBalance,
						`Insufficient balance (current balance: ${maxBalance})`,
					),
				),
			}),
		[maxBalance],
	)

	const form = useForm<v.InferInput<typeof formSchema>>({
		initialValues: {
			amount: 0,
		},
		validate: valibotResolver(formSchema),
	})

	// check if the chain is correct
	const switchCorrectChain = useSwitchCorrectChain({
		chainId: rss3Chain.id,
	})

	const allowance = useRss3Allowance()

	const requestedAmount = parseUnits(form.values.amount.toString(), 18)

	const deposit = useRss3Deposit(requestedAmount)

	const handleDeposit = useCallback(
		(values: v.InferInput<typeof formSchema>) => {
			if (
				typeof rss3.data === "undefined" ||
				typeof allowance.data === "undefined"
			) {
				return
			}

			if (!switchCorrectChain.data) {
				switchCorrectChain.switchChain()
				return
			}

			// deposit
			if (!deposit.checkSimulate.check()) return

			deposit.contractWrite.writeContract(deposit.simulate.data!.request)
		},
		[
			rss3.data,
			allowance.data,
			switchCorrectChain,
			deposit.checkSimulate,
			deposit.contractWrite,
			deposit.simulate.data,
		],
	)

	const handleClose = useCallback(() => {
		form.reset()
		onClose()
	}, [form, onClose])

	useEffect(() => {
		if (deposit.waitForTransaction.isSuccess) {
			handleClose()
		}
	}, [
		deposit.waitForTransaction.isSuccess,
		// handleClose
	])

	return (
		<Modal
			opened={opened}
			onClose={handleClose}
			title="Deposit $RSS3"
			centered
			closeOnClickOutside={!form.isDirty()}
		>
			<form onSubmit={form.onSubmit(handleDeposit)}>
				<BalanceInput
					max={maxBalance}
					onClickMax={() => {
						form.setFieldValue("amount", maxBalance)
					}}
					{...form.getInputProps("amount")}
				/>

				<Group mt="md" justify="flex-end">
					<Button
						variant="default"
						onClick={handleClose}
						disabled={
							deposit.contractWrite.isPending ||
							(deposit.contractWrite.data &&
								deposit.waitForTransaction.isPending)
						}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						loading={
							deposit.contractWrite.isPending ||
							(deposit.contractWrite.data &&
								deposit.waitForTransaction.isPending) ||
							rss3.isPending ||
							allowance.isPending ||
							deposit.simulate.isFetching
						}
						disabled={!form.values.amount}
					>
						Deposit
					</Button>
				</Group>
			</form>
		</Modal>
	)
}

function WithdrawModal({
	opened,
	onClose,
}: {
	opened: boolean
	onClose: () => void
}) {
	const depositedRss3 = useDepositedRss3Balance()
	const currentRequestWithdrawal = useGetCurrentRequestWithdrawal()

	const depositedRss3Balance = depositedRss3.data ?? 0n

	const maxBalance = parseFloat(formatUnits(depositedRss3Balance, 18))

	const requestWithdrawal = useRequestWithdrawal()

	const formSchema = useMemo(
		() =>
			v.object({
				amount: v.pipe(
					v.number(),
					v.minValue(0),
					v.maxValue(
						maxBalance,
						`Insufficient balance (current balance: ${maxBalance})`,
					),
				),
			}),
		[maxBalance],
	)

	const form = useForm<v.InferInput<typeof formSchema>>({
		initialValues: {
			amount: 0,
		},
		validate: valibotResolver(formSchema),
	})

	const withdraw = useRequestWithdrawal()

	const handleClose = () => {
		form.reset()
		onClose()
	}

	useEffect(() => {
		if (withdraw.isSuccess) {
			handleClose()
		}
	}, [withdraw.isSuccess])

	const handleWithdraw = useCallback(
		(values: v.InferInput<typeof formSchema>) => {
			openConfirmModal({
				centered: true,
				title: "Please confirm your action",
				children: (
					<>
						<Text>
							Please confirm that you want to withdraw{" "}
							<Text span ff="monospace" fw="bold">
								<NumberFormatter value={values.amount} suffix=" RSS3" />
							</Text>{" "}
							from your deposited $RSS3.
						</Text>
						<CurrentWithdrawalWarning
							amount={currentRequestWithdrawal.data?.amount ?? 0}
						/>
					</>
				),
				labels: { confirm: "Withdraw", cancel: "Cancel" },
				onConfirm: () => {
					withdraw.mutate({ amount: values.amount })
				},
			})
		},
		[currentRequestWithdrawal.data?.amount, withdraw],
	)

	return (
		<Modal
			opened={opened}
			onClose={handleClose}
			title={
				<Group gap="xs">
					<Text>Withdraw from Balance</Text>
					<Tooltip
						maw={300}
						multiline
						label={
							<>
								Withdrawal requests are processed at the end of each Epoch
								(every 18 hours).
								<br />
								The final amount you receive will include deductions for the
								following:
								<br />
								1. Ethereum Gas fees (in $RSS3), determined by the Ethereum
								blockchain's network condition.
								<br />
								2. Any usage fees incurred after initiating this withdrawal
								request.
							</>
						}
					>
						<IconExclamationCircle />
					</Tooltip>
				</Group>
			}
			centered
			closeOnClickOutside={!form.isDirty()}
		>
			<form onSubmit={form.onSubmit(handleWithdraw)}>
				<BalanceInput
					max={maxBalance}
					onClickMax={() => {
						form.setFieldValue("amount", maxBalance)
					}}
					{...form.getInputProps("amount")}
				/>

				<CurrentWithdrawalWarning
					amount={currentRequestWithdrawal.data?.amount ?? 0}
				/>

				<Group mt="md" justify="flex-end">
					<Button
						variant="default"
						onClick={handleClose}
						disabled={
							depositedRss3.isLoading ||
							requestWithdrawal.isPending ||
							withdraw.isPending
						}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						loading={
							depositedRss3.isLoading ||
							requestWithdrawal.isPending ||
							withdraw.isPending
						}
						disabled={!form.values.amount}
					>
						Request
					</Button>
				</Group>
			</form>
		</Modal>
	)
}

function CurrentWithdrawalWarning({ amount }: { amount: number }) {
	const [opened, setOpened] = useState(false)

	return (
		amount > 0 && (
			<>
				<Text c="yellow" size="sm" my="md">
					<Text span fw="bold" ff="monospace">
						<NumberFormatter value={amount} thousandSeparator suffix=" RSS3" />
					</Text>{" "}
					is pending withdrawal. If you withdraw again now, the pending
					withdrawal will be replaced by this one. You can also{" "}
					<Anchor c="red" onClick={() => setOpened(true)}>
						cancel
					</Anchor>{" "}
					the pending withdrawal.
				</Text>
				<CancelCurrentWithdrawalModal
					opened={opened}
					onClose={() => setOpened(false)}
				/>
			</>
		)
	)
}

function CancelCurrentWithdrawalModal({
	opened,
	onClose,
}: {
	opened: boolean
	onClose: () => void
}) {
	const cancelWithdraw = useCancelRequestWithdrawal()

	const handleClose = useCallback(() => {
		cancelWithdraw.reset()
		onClose()
	}, [cancelWithdraw, onClose])

	useEffect(() => {
		if (cancelWithdraw.isSuccess) {
			handleClose()
		}
	}, [cancelWithdraw.isSuccess, handleClose])

	return (
		<Modal
			opened={opened}
			onClose={handleClose}
			title="Cancel Pending Withdrawal"
			centered
		>
			<Text>Are you sure you want to cancel your pending withdrawal?</Text>

			<Group mt="md" justify="flex-end">
				<Button
					variant="default"
					onClick={handleClose}
					disabled={cancelWithdraw.isPending}
				>
					Cancel
				</Button>
				<Button
					color="red"
					loading={cancelWithdraw.isPending}
					onClick={() => {
						cancelWithdraw.mutate()
					}}
				>
					Cancel
				</Button>
			</Group>
		</Modal>
	)
}
