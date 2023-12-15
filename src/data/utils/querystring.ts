type MaybeArray<T> = T | T[]
type Numberish = number | bigint | string

export function querystring(
	params: Record<string, MaybeArray<Numberish> | boolean | undefined | null>,
) {
	return new URLSearchParams(
		Object.entries(params)
			.filter(
				(entry): entry is [string, string | string[]] =>
					entry[1] !== undefined && entry[1] !== null,
			)
			.sort(([keyA], [keyB]) => keyA.localeCompare(keyB)) // sort entries by key in alphabetical order
			.flatMap(([key, values]) =>
				Array.isArray(values)
					? values.map((value) => [key, value.toString()])
					: [[key, values.toString()]],
			),
	).toString()
}
