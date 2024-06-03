import { ApiReference } from "@scalar/nextjs-api-reference"

const content = await fetch("https://gi.rss3.io/docs/openapi.yaml").then((r) =>
	r.text(),
)

export const GET = ApiReference({
	spec: {
		content,
	},
})
