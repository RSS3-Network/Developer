import type { Config } from "tailwindcss"

export default ({
	content: [
		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	presets: [
		// add rss3 preset
		require("@rss3/mantine-theme/tailwind/preset"),
	],
} satisfies Config)
