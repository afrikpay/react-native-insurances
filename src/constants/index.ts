import { COLORS } from "./Colors"

export const getColor = (status: string) => {
    if (["A", "C", "D", "R"].includes(status)) return COLORS.success
    if ( status == "V" ) return COLORS.light_blue
    if ( status == "P" ) return COLORS.yellow
    return COLORS.dark
}