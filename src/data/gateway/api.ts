import { querystring } from "../utils/querystring"

function ff(url: string, init?: RequestInit) {
	return fetch(url, init).then(async (res) => {
		if (res.ok) {
			return res
		} else {
			throw new Error(await res.text())
		}
	})
}

/// history

type HistoryCollectionInput = {
	page?: number
	limit?: number
}
type HistoryCollectionResult = {
	count: number
	list: {
		amount: number
		block_timestamp: number
		index: number
		tx_hash: `0x${string}`
	}[]
	page_current: number
	page_max: number
}
export async function getHistoryCollection({
	page = 0,
	limit = 20,
}: HistoryCollectionInput = {}) {
	return (await (
		await ff(
			`/api/gateway/history/collection?${querystring({
				page,
				limit,
			})}`,
		)
	).json()) as HistoryCollectionResult
}

type HistoryConsumptionInput = {
	keyId?: number
	since?: number
	until?: number
	merge?: boolean
}
type HistoryConsumptionResult = {
	history: {
		api_calls: number
		consumption_date: number
		key_name: string
		ru_used: number
	}[]
	since: number
	until: number
}
export async function getHistoryConsumption({
	keyId,
	since,
	until,
	merge,
}: HistoryConsumptionInput = {}) {
	const keyPath = keyId ? `/${keyId}` : ""
	return (await (
		await ff(
			`/api/gateway/history/consumption${keyPath}?${querystring({
				since,
				until,
				merge,
			})}`,
		)
	).json()) as HistoryConsumptionResult
}

type HistoryDepositInput = {
	page?: number
	limit?: number
}
type HistoryDepositResult = {
	count: number
	list: {
		amount: number
		block_timestamp: number
		index: number
		tx_hash: string
	}[]
	page_current: number
	page_max: number
}
export async function getHistoryDeposit({
	page,
	limit,
}: HistoryDepositInput = {}) {
	return (await (
		await ff(
			`/api/gateway/history/deposit?${querystring({
				page,
				limit,
			})}`,
		)
	).json()) as HistoryDepositResult
}

type HistoryWithdrawalInput = {
	page?: number
	limit?: number
}
type HistoryWithdrawalResult = {
	count: number
	list: {
		amount: number
		block_timestamp: number
		fee: number
		index: number
		tx_hash: string
		user: string
	}[]
	page_current: number
	page_max: number
}
export async function getHistoryWithdrawal({
	page,
	limit,
}: HistoryWithdrawalInput = {}) {
	return (await (
		await ff(
			`/api/gateway/history/withdrawal?${querystring({
				page,
				limit,
			})}`,
		)
	).json()) as HistoryWithdrawalResult
}

/// key
type GenerateKeyInput = {
	name: string
}
type KeyResult = {
	api_calls_current: number
	api_calls_total: number
	id: number
	key: string
	name: string
	ru_used_current: number
	ru_used_total: number
}
/** i.e. add an app */
export async function generateKey({ name }: GenerateKeyInput) {
	return (await (
		await ff(`/api/gateway/key`, {
			method: "POST",
			body: JSON.stringify({ name }),
			headers: { "Content-Type": "application/json" },
		})
	).json()) as KeyResult
}

type DeleteKeyInput = {
	id: number
}
export async function deleteKey({ id }: DeleteKeyInput) {
	return await (
		await ff(`/api/gateway/key/${id}`, {
			method: "DELETE",
		})
	).text()
}

type GetKeyInput = {
	id: number
}
export async function getKey({ id }: GetKeyInput) {
	return (await (await ff(`/api/gateway/key/${id}`)).json()) as KeyResult
}

type ReassignKeySecretInput = {
	id: number
}
export async function reassignKeySecret({ id }: ReassignKeySecretInput) {
	return (await (
		await ff(`/api/gateway/key/${id}`, {
			method: "PATCH",
		})
	).json()) as KeyResult
}

type UpdateKeyInput = {
	id: number
	name: string
}
export async function updateKey({ id, name }: UpdateKeyInput) {
	return (await (
		await ff(`/api/gateway/key/${id}`, {
			method: "PUT",
			body: JSON.stringify({ name }),
			headers: { "Content-Type": "application/json" },
		})
	).json()) as KeyResult
}

export async function getKeys() {
	return (await (await ff(`/api/gateway/keys`)).json()) as KeyResult[]
}

/// request

type RequestWithdrawalResult = {
	/** how many pending, in eth */
	amount: number
}
export async function getCurrentRequestWithdraw() {
	return (await (
		await ff(`/api/gateway/request/withdraw`)
	).json()) as RequestWithdrawalResult
}

type RequestWithdrawInput = {
	amount: number
}
export async function requestWithdraw({ amount }: RequestWithdrawInput) {
	return await (
		await ff(`/api/gateway/request/withdraw?${querystring({ amount })}`, {
			method: "POST",
		})
	).text()
}

/// ru

type RuResult = {
	api_calls_current: number
	api_calls_total: number
	ru_limit: number
	ru_used_current: number
	ru_used_total: number
}
export async function getRu() {
	return (await (await ff(`/api/gateway/ru`)).json()) as RuResult
}
