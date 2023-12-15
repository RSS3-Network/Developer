"use client"

import { showNotification } from "@mantine/notifications"
import {
	QueryClient,
	type QueryClientConfig,
	QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"

const config: QueryClientConfig = {
	defaultOptions: {
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
