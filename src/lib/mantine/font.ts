import { Poppins } from "next/font/google"
import localFont from "next/font/local"

export const font = Poppins({
	weight: ["300", "400"],
	subsets: ["latin"],
	variable: "--font-poppins",
})

export const fontMonospace = localFont({
	src: "../../../public/fonts/OCR_B_Std_Regular.otf",
	variable: "--font-ocr-b-std",
})

export const fontClassNames = `${font.variable} ${fontMonospace.variable} scroll-smooth`
