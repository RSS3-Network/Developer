"use client"

import { BreadcrumbsTitle } from "@/components/breadcrumbs"
import { useGetKeys } from "@/data/gateway/hooks"
import { Card, Group, SimpleGrid, Skeleton, Text } from "@mantine/core"
import { IconCirclePlus } from "@tabler/icons-react"
import Link from "next/link"

export default function DashboardIndex() {
	const appList = useGetKeys()

	return (
		<>
			<Group>
				<BreadcrumbsTitle items={[{ href: "/apps", label: "Apps" }]} />
			</Group>

			<SimpleGrid
				mt="md"
				cols={{
					lg: 3,
					md: 2,
					xs: 1,
				}}
			>
				{appList.data?.map?.((key) => (
					<Card
						component={Link}
						href={`/apps/${key.id}`}
						key={key.id}
						withBorder
					>
						<Text lineClamp={1}>{key.name}</Text>
					</Card>
				))}

				{appList.isPending ? (
					<CardsSkeleton />
				) : (
					<Card component={Link} href="/apps/new" withBorder>
						<Group>
							<IconCirclePlus />
							NEW
						</Group>
					</Card>
				)}
			</SimpleGrid>
		</>
	)
}

function CardsSkeleton() {
	return (
		<>
			<Skeleton>
				<Card withBorder>.</Card>
			</Skeleton>
			<Skeleton>
				<Card withBorder>.</Card>
			</Skeleton>
			<Skeleton>
				<Card withBorder>.</Card>
			</Skeleton>
		</>
	)
}
