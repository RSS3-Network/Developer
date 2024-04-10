import {
	Group,
	HoverCard,
	HoverCardDropdown,
	HoverCardTarget,
	Stack,
	Text,
} from "@mantine/core"
import Link from "next/link"

type HeaderNavItems =
	| {
			label: string
			href: string
			external?: boolean
			dropdown?: never
	  }
	| {
			label: string
			href?: never
			external?: boolean
			dropdown: {
				label: string
				href: string
				external?: boolean
			}[]
	  }

const headerNavItems: HeaderNavItems[] = [
	{ label: "Network", href: "https://rss3.io/network" },
	{
		label: "Products",
		dropdown: [
			{ label: "Social", href: "https://rss3.io/social" },
			{ label: "Search", href: "https://rss3.io/search" },
			{ label: "AI", href: "https://rss3.io/ai" },
		],
	},
	{ label: "Ecosystem", href: "https://rss3.io/ecosystem" },
	{ label: "Docs", href: "https://docs.rss3.io", external: true },
	{ label: "Blogs", href: "https://rss3.io/blog" },
]

export function HeaderNav() {
	return (
		<>
			{headerNavItems.map((item) => {
				if (item.dropdown) {
					return (
						<HoverCard key={item.label}>
							<HoverCardTarget>
								<Group gap="xs" className="cursor-pointer">
									<DownArrow />
									<Text tt="uppercase">{item.label}</Text>
								</Group>
							</HoverCardTarget>
							<HoverCardDropdown p="sm">
								<Stack gap="xs">
									{item.dropdown.map((subItem) => {
										return (
											<LinkItem
												key={subItem.label}
												href={subItem.href}
												label={subItem.label}
												external={subItem.external}
											/>
										)
									})}
								</Stack>
							</HoverCardDropdown>
						</HoverCard>
					)
				} else {
					return (
						<LinkItem
							key={item.label}
							href={item.href}
							label={item.label}
							external={item.external}
						/>
					)
				}
			})}
		</>
	)
}

function LinkItem({
	href,
	label,
	external,
}: {
	href: string
	label: string
	external?: boolean
}) {
	return (
		<Link href={href} className="uppercase hover:underline">
			{label}
		</Link>
	)
}

function DownArrow() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="8"
			height="9"
			viewBox="0 0 8 9"
			fill="none"
			className="size-3"
		>
			<path
				d="M1.27344 4.95135L4.04537 7.72336L6.81738 4.95135"
				stroke="currentColor"
				strokeWidth="0.75"
				strokeLinecap="square"
			/>
			<path
				d="M1.27344 1.29822L4.04537 4.07023L6.81738 1.29822"
				stroke="currentColor"
				strokeWidth="0.75"
				strokeLinecap="square"
			/>
		</svg>
	)
}
