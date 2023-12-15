import { Breadcrumbs as Breadcrumbs_, Title } from "@mantine/core"
import Link from "next/link"
import classes from "./index.module.css"

type BreadcrumbsTitleItem = {
	href: string
	label: string
}

export function BreadcrumbsTitle({ items }: { items: BreadcrumbsTitleItem[] }) {
	return (
		<Breadcrumbs_ my="lg">
			{items.map((item, index) => {
				const isActive = index === items.length - 1
				if (isActive) {
					return (
						<Title
							className={classes.item}
							key={item.href}
							order={2}
							data-active={true}
						>
							{item.label}
						</Title>
					)
				} else {
					return (
						<Title
							className={classes.item}
							key={item.href}
							order={2}
							component={Link}
							// @ts-ignore
							href={item.href}
						>
							{item.label}
						</Title>
					)
				}
			})}
		</Breadcrumbs_>
	)
}
