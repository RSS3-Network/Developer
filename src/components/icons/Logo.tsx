import { rem } from "@mantine/core"

interface LogoIconProps extends React.ComponentPropsWithoutRef<"svg"> {
	size?: number | string
}

// million-ignore
const LogoIcon = ({ size, style, ...others }: LogoIconProps) => {
	return (
		<svg
			style={{
				height: rem(size),
				width: rem(size),
				...style,
			}}
			width="122"
			height="122"
			viewBox="0 0 122 122"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...others}
		>
			<g clipPath="url(#clip0_18_38)">
				<path
					d="M117.46 30.43H92.39C91.29 30.43 90.39 29.53 90.39 28.43V4C90.39 2.9 89.49 2 88.39 2H4C2.9 2 2 2.9 2 4V117.36C2 118.46 2.9 119.36 4 119.36H88.4C89.5 119.36 90.4 118.46 90.4 117.36V92.93C90.4 91.83 91.3 90.93 92.4 90.93H117.47C118.57 90.93 119.47 90.03 119.47 88.93V32.43C119.47 31.33 118.57 30.43 117.47 30.43H117.46ZM33.43 31.43H88.03C89.13 31.43 90.03 32.33 90.03 33.43V87.93C90.03 89.03 89.13 89.93 88.03 89.93H33.43C32.33 89.93 31.43 89.03 31.43 87.93V33.43C31.43 32.33 32.33 31.43 33.43 31.43Z"
					fill="#1477FB"
				/>
			</g>
			<defs>
				<clipPath id="clip0_18_38">
					<rect
						width="117.46"
						height="117.36"
						fill="white"
						transform="translate(2 2)"
					/>
				</clipPath>
			</defs>
		</svg>
	)
}

export default LogoIcon
