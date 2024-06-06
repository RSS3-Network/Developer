import { ApiReference } from "@scalar/nextjs-api-reference"

let cache: any = null
let cachedTime: number = 0
const ttl = 1000 * 60 * 5 // 5 minutes

export const GET = async () => {
	let content
	if (cache && Date.now() - cachedTime < ttl) {
		content = cache
	} else {
		content = await fetch("https://gi.rss3.io/docs/openapi.json", {
			cache: "no-store",
		}).then((r) => r.text())
		content = JSON.parse(content)
		content.info.description += `\n\n*Last updated: ${new Date().toLocaleString()} (UTC)*`
		content = JSON.stringify(content, null, 2)
		cache = content
		cachedTime = Date.now()
	}
	content = JSON.parse(content)
	content.info.description += `\n\n*Current time: ${new Date().toLocaleString()} (UTC)*`
	content = JSON.stringify(content, null, 2)

	return ApiReference({
		theme: "kepler",
		metaData: {
			title: "RSS3 Gateway API Reference",
			description: "The RSS3 Gateway API Reference",
			author: "RSS3 Developers",
			creator: "RSS3",
		},
		spec: {
			content,
		},
	})()
}
