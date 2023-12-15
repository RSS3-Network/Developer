import { ConnectButton } from "@/components/connect-button"
import { Title } from "@mantine/core"

export default function Page() {
	return (
		<div
			className="flex flex-col items-center justify-center space-y-10"
			style={{
				height:
					"calc(100dvh - var(--app-shell-header-offset, 0px) - var(--app-shell-padding) - var(--app-shell-footer-offset, 0px) - var(--app-shell-padding))",
				backgroundImage: "url(/images/home-bg.svg)",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
			}}
		>
			{/* <FirstScreenBg /> */}
			<div className="flex flex-col items-center justify-center space-y-10">
				<Title fw="300" order={1} size="3.75rem" ta="center">
					Build with Billions of
					<br /> Open Information
				</Title>
				<ConnectButton connectText="BUILD WITH RSS3 →" />
			</div>
		</div>
	)
}
