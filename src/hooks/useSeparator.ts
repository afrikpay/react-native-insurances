const useSeparator = () => {

    // Séparateur de milliers
    const numberWithCommas = (number: number, separator?: string) => {
        let val  = Number(number)
        if (val) return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator ?? " ")
        else return 0
    }

    // Séparateur de milliers
    const stringWithCommas = (val: string, separator?: string) => {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator ?? " ")
    }

    return {
        numberWithCommas, // Fonction pour séparer les milliers
        stringWithCommas,
    }
}
export default useSeparator;