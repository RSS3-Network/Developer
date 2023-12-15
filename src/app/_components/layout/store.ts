import { useAtom } from "jotai/react"
import { atom } from "jotai/vanilla"

export const navOpenedAtom = atom(false)

export const useNavOpened = () => {
	return useAtom(navOpenedAtom)
}
