/**
 * This is the file used to generate wagmi abis and hooks.
 * Run `pnpm run wagmi:gen` to generate.
 */
import { erc20Abi } from "viem"
import { mainnet, rss3, rss3Sepolia, sepolia } from "wagmi/chains"

import { defineConfig } from "@wagmi/cli"
import { actions, fetch as fetchPlugin, react } from "@wagmi/cli/plugins"

async function fetchImplementationAddress(url: string) {
	const ret = await fetch(url).then((res) => res.json())
	return (ret.implementation_address ?? ret.hash) as `0x${string}`
}

const billingImplementationAddress = await fetchImplementationAddress(
	`https://scan.testnet.rss3.io/api/v2/addresses/0xdDA34Ad1a90d9EA830cf9fC59DC5eBB3D864BE4E`,
)

export default defineConfig({
	out: "./src/data/contracts/hooks/core.ts",
	contracts: [
		{
			name: "rss3Token",
			abi: erc20Abi,
			address: {
				[mainnet.id]: "0xc98D64DA73a6616c42117b582e832812e7B8D57F",
				[rss3.id]: "0x4200000000000000000000000000000000000042",
				[sepolia.id]: "0x3Ef1D5be1E2Ce46c583a0c8e511f015706A0ab23",
				[rss3Sepolia.id]: "0x4200000000000000000000000000000000000042",
			},
		},
	],
	plugins: [
		fetchPlugin({
			cacheDuration: 0,
			contracts: [
				{
					name: "billing",
					address: {
						[rss3.id]: "0x0000000000000000000000000000000000000000", // TODO:
						[rss3Sepolia.id]: "0xdDA34Ad1a90d9EA830cf9fC59DC5eBB3D864BE4E",
					},
				},
			],
			async request(contract) {
				return {
					url: `https://scan.testnet.rss3.io/api?module=contract&action=getabi&address=${billingImplementationAddress}`,
				}
			},
			async parse({ response }) {
				const json = await response.json()
				if (json.status === "0") throw new Error(json.message)
				return JSON.parse(json.result)
			},
		}),
		react(),
		actions(),
	],
})
