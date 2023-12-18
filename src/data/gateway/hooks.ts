import { showNotification } from "@mantine/notifications"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
	deleteKey,
	generateKey,
	getCurrentRequestWithdraw,
	getHistoryCollection,
	getHistoryConsumption,
	getHistoryDeposit,
	getHistoryWithdrawal,
	getKey,
	getKeys,
	getRu,
	reassignKeySecret,
	requestWithdraw,
	updateKey,
} from "./api"

type Arg<T extends (...arg: any[]) => any> = Parameters<T>[0]
type Res<T extends (...arg: any[]) => any> = Awaited<ReturnType<T>>

/// history

export function qk_getHistoryCollection(arg: Arg<typeof getHistoryCollection>) {
	return ["historyCollection", arg]
}
export function useGetHistoryCollection(arg: Arg<typeof getHistoryCollection>) {
	return useQuery({
		queryKey: qk_getHistoryCollection(arg),
		queryFn: () => getHistoryCollection(arg),
	})
}

export function qk_getHistoryConsumption(
	arg: Arg<typeof getHistoryConsumption>,
) {
	return ["historyConsumption", arg]
}
export function useGetHistoryConsumption(
	arg: Arg<typeof getHistoryConsumption>,
) {
	return useQuery({
		queryKey: qk_getHistoryConsumption(arg),
		queryFn: () => getHistoryConsumption(arg),
	})
}

export function qk_getHistoryDeposit(arg: Arg<typeof getHistoryDeposit>) {
	return ["historyDeposit", arg]
}
export function useGetHistoryDeposit(arg: Arg<typeof getHistoryDeposit>) {
	return useQuery({
		queryKey: qk_getHistoryDeposit(arg),
		queryFn: () => getHistoryDeposit(arg),
	})
}

export function qk_getHistoryWithdrawal(arg: Arg<typeof getHistoryWithdrawal>) {
	return ["historyWithdrawal", arg]
}
export function useGetHistoryWithdrawal(arg: Arg<typeof getHistoryWithdrawal>) {
	return useQuery({
		queryKey: qk_getHistoryWithdrawal(arg),
		queryFn: () => getHistoryWithdrawal(arg),
	})
}

/// key

export function useGenerateKey() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (arg: Arg<typeof generateKey>) => {
			return generateKey(arg)
		},
		onSuccess() {
			showNotification({
				color: "teal",
				title: "Success",
				message: "New app has been created",
			})
			queryClient.invalidateQueries({ queryKey: qk_getKeys() })
		},
	})
}

export function useDeleteKey() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (arg: Arg<typeof deleteKey>) => {
			return deleteKey(arg)
		},
		onSuccess(data, variables) {
			showNotification({
				color: "teal",
				title: "Success",
				message: "App has been deleted",
			})
			const { id } = variables
			queryClient.removeQueries({
				queryKey: qk_getKey({ id }),
			})
			queryClient.setQueryData<Res<typeof getKeys>>(qk_getKeys(), (old) => {
				return old?.filter((x) => x.id !== id)
			})
			queryClient.invalidateQueries({ queryKey: qk_getKeys() })
		},
	})
}

export function qk_getKey(arg: Arg<typeof getKey>) {
	return ["key", arg]
}
export function useGetKey(arg: Arg<typeof getKey>) {
	return useQuery({
		queryKey: qk_getKey(arg),
		queryFn: () => getKey(arg),
	})
}

export function useReassignKeySecret() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (arg: Arg<typeof reassignKeySecret>) => {
			return reassignKeySecret(arg)
		},
		onSuccess(data, variables) {
			showNotification({
				color: "teal",
				title: "Success",
				message: "Key secret has been updated",
			})
			const { id } = variables
			// update key
			queryClient.setQueryData<Res<typeof getKey>>(qk_getKey({ id }), (old) => {
				return { ...old, ...data }
			})
			queryClient.invalidateQueries({ queryKey: qk_getKey({ id }) })
			// update key in keys
			queryClient.setQueryData<Res<typeof getKeys>>(qk_getKeys(), (old) => {
				return old?.map((x) => {
					if (x.id === id) {
						return {
							...x,
							key: data.key,
						}
					}
					return x
				})
			})
		},
	})
}

export function useUpdateKey() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (arg: Arg<typeof updateKey>) => {
			return updateKey(arg)
		},
		onSuccess(data, variables) {
			showNotification({
				color: "teal",
				title: "Success",
				message: `App name has been updated to ${data.name}`,
			})
			const { id } = variables
			// update key
			queryClient.setQueryData<Res<typeof getKey>>(qk_getKey({ id }), (old) => {
				return { ...old, ...data }
			})
			queryClient.invalidateQueries({ queryKey: qk_getKey({ id }) })
			// update key in keys
			queryClient.setQueryData<Res<typeof getKeys>>(qk_getKeys(), (old) => {
				return old?.map((x) => {
					if (x.id === id) {
						return {
							...x,
							name: data.name,
						}
					}
					return x
				})
			})
			queryClient.invalidateQueries({ queryKey: qk_getKeys() })
		},
	})
}

export function qk_getKeys() {
	return ["keys"]
}
export function useGetKeys() {
	return useQuery({
		queryKey: qk_getKeys(),
		queryFn: () => getKeys(),
	})
}

/// request

export function qk_getCurrentRequestWithdrawal() {
	return ["requestWithdrawal"]
}
export function useGetCurrentRequestWithdrawal() {
	return useQuery({
		queryKey: qk_getCurrentRequestWithdrawal(),
		queryFn: () => getCurrentRequestWithdraw(),
	})
}

export function useRequestWithdrawal() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (arg: Arg<typeof requestWithdraw>) => {
			return requestWithdraw(arg)
		},
		onSuccess(data, variables) {
			showNotification({
				color: "teal",
				title: "Success",
				message: "Withdrawal request has been sent",
			})
			const { amount } = variables
			queryClient.setQueryData<Res<typeof getCurrentRequestWithdraw>>(
				qk_getCurrentRequestWithdrawal(),
				{ amount },
			)
			queryClient.invalidateQueries({
				queryKey: qk_getCurrentRequestWithdrawal(),
			})
			queryClient.invalidateQueries({
				queryKey: qk_getHistoryWithdrawal({}),
			})
		},
	})
}

export function useCancelRequestWithdrawal() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: () => {
			return requestWithdraw({ amount: 0 })
		},
		onSuccess(data, variables) {
			showNotification({
				color: "teal",
				title: "Success",
				message: "Withdrawal request has been cancelled",
			})
			queryClient.setQueryData<Res<typeof getCurrentRequestWithdraw>>(
				qk_getCurrentRequestWithdrawal(),
				{ amount: 0 },
			)
			queryClient.invalidateQueries({
				queryKey: qk_getCurrentRequestWithdrawal(),
			})
			queryClient.invalidateQueries({
				queryKey: qk_getHistoryWithdrawal({}),
			})
		},
	})
}

/// ru

export function qk_getRu() {
	return ["ru"]
}
export function useGetRu() {
	return useQuery({
		queryKey: qk_getRu(),
		queryFn: () => getRu(),
	})
}
