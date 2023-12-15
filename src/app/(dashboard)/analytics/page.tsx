import { BreadcrumbsTitle } from "@/components/breadcrumbs"
import HistoryChart from "@/components/charts/history"

export default function Page() {
	return (
		<>
			<BreadcrumbsTitle items={[{ href: "/analytics", label: "Analytics" }]} />

			<HistoryChart />
		</>
	)
}
