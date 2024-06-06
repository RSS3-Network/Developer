import { ApiReference } from "@scalar/nextjs-api-reference"

// const content = await fetch("https://gi.rss3.io/docs/openapi.json").then((r) =>
// 	r.text(),
// )

export const GET = ApiReference({
	spec: {
		url: "https://gi.rss3.io/docs/openapi.json",
		// content,
	},
})
