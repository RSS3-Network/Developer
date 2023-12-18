"use client"

import { showNotification } from "@mantine/notifications"
import {
	QueryCache,
	QueryClient,
	type QueryClientConfig,
	QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { notFound } from "next/navigation"
import { useState } from "react"
import { HttpRequestError } from "viem"

const MAX_RETRIES = 3
const HTTP_STATUS_TO_NOT_RETRY = [400, 401, 403, 404]

const config: QueryClientConfig = {
	queryCache: new QueryCache({
		onError(error) {
			if (error instanceof HttpRequestError) {
				if (error.status === 404) {
					notFound()
				}
			}
		},
	}),
	defaultOptions: {
		queries: {
			retry: (failureCount, error) => {
				if (failureCount > MAX_RETRIES) {
					return false
				}

				if (
					error instanceof HttpRequestError &&
					HTTP_STATUS_TO_NOT_RETRY.includes(error.status ?? 0)
				) {
					return false
				}

				return true
			},

			// With SSR, we usually want to set some default staleTime
			// above 0 to avoid refetching immediately on the client
			staleTime: 60 * 1000,
		},
		mutations: {
			onError(error) {
				showNotification({
					color: "red",
					title: "Error",
					message: error.message,
				})
			},
		},
	},
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient(config))

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
