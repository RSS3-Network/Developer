"use client"

import { theme } from "@rss3/mantine-theme"

// font
import { Poppins } from "next/font/google"
const font = Poppins({
	weight: ["200", "300", "400", "500", "600", "700", "800"],
	subsets: ["latin"],
	variable: "--font-poppins",
})
theme.fontFamily = font.style.fontFamily

export { theme }
