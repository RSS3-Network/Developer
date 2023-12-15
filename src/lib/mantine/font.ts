import { Poppins } from "next/font/google"
import localFont from "next/font/local"

const poppins = Poppins({
	weight: ["300", "400"],
	subsets: ["latin"],
	variable: "--font-poppins",
})

const OcrBStd = localFont({
	src: "../../../public/fonts/OCR_B_Std_Regular.otf",
	variable: "--font-ocr-b-std",
})

export const fontClassNames = `${poppins.variable} ${OcrBStd.variable} scroll-smooth`
export const fontFamilies = `${poppins.style.fontFamily}, ${OcrBStd.style.fontFamily}`
