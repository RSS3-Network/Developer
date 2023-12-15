import { BreadcrumbsTitle } from "@/components/breadcrumbs"
import { Space } from "@mantine/core"
import { Balance } from "./_component/balance"
import { Records } from "./_component/records"

export default function Page() {
	return (
		<>
			<BreadcrumbsTitle items={[{ href: "/billing", label: "Billing" }]} />

			<Balance />

			<Space h="lg" />

			<Records />
		</>
	)
}
