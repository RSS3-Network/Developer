"use client"

import { DEFAULT_THEME, createTheme, mergeMantineTheme } from "@mantine/core"
import { fontFamilies } from "./font"

const themeOverride = createTheme({
	fontFamily: fontFamilies,
	headings: {
		fontFamily: fontFamilies,
	},
	colors: {
		blue: [
			"#e5f4ff",
			"#cde4ff",
			"#9cc6fe",
			"#67a7fc",
			"#3c8cfb",
			"#217cfa",
			"#0d73fb",
			"#0062e0",
			"#0057c9",
			"#004bb2",
		],
		// gray: [
		//   "#f1f5f9",
		//   "#e3e8ec",
		//   "#c1cfda",
		//   "#9cb5c9",
		//   "#7d9fba",
		//   "#6a91b1",
		//   "#5e8aae",
		//   "#4e7799",
		//   "#436a89",
		//   "#335c7a",
		// ],
	},
	components: {
		Modal: {
			defaultProps: {
				overlayProps: {
					backgroundOpacity: 0.3,
					blur: 1,
				},
			},
		},
		Tooltip: {
			styles: {
				tooltip: {
					background: "var(--mantine-color-default)",
					boxShadow: "var(--mantine-shadow-sm)",
					color: "var(--mantine-color-text)",
				},
			},
		},
		TooltipFloating: {
			styles: {
				tooltip: {
					background: "var(--mantine-color-default)",
					boxShadow: "var(--mantine-shadow-sm)",
					color: "var(--mantine-color-text)",
				},
			},
		},
	},
	primaryColor: "blue",
})

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride)
