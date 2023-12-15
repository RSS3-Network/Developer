import { Button, NumberInput, type NumberInputProps } from "@mantine/core"

interface BalanceInputProps extends NumberInputProps {
	onClickMax?: () => void
}

export function BalanceInput({
	onClickMax,
	max,
	min,
	...props
}: BalanceInputProps) {
	const _min = min ?? 0
	const _safeMax = 100_000_000_000
	const _max = max ?? _safeMax
	const error =
		typeof props.value !== "number"
			? "Invalid value"
			: props.value < _min
			  ? `Value must be greater than ${_min}`
			  : props.value > _safeMax
				  ? `Value must be less than ${_safeMax}`
				  : props.value > _max
					  ? `Insufficient balance (max: ${_max})`
					  : undefined

	return (
		<NumberInput
			size="lg"
			allowDecimal
			decimalScale={10}
			thousandSeparator
			min={_min}
			max={_safeMax} // for safety
			rightSectionPointerEvents="all"
			rightSectionWidth={80}
			error={error}
			styles={{
				section: {
					pointerEvents: "all",
				},
			}}
			rightSection={
				onClickMax && (
					<Button size="compact-md" variant="subtle" onClick={onClickMax}>
						MAX
					</Button>
				)
			}
			{...props}
		/>
	)
}
