"use client"

import { BreadcrumbsTitle } from "@/components/breadcrumbs"
import { useGetKey } from "@/data/gateway/hooks"

export function Title({ id }: { id: number }) {
	const key = useGetKey({ id })

	return (
		<BreadcrumbsTitle
			items={[
				{ href: "/apps", label: "Apps" },
				{ href: `/apps/${id}`, label: key.data?.name ?? "..." },
			]}
		/>
	)
}
