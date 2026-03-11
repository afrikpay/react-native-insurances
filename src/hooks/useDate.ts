const useDate = () => {

    const addDays = (date: Date, days: number): Date => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };

    const addMonths = (date: Date, months: number): Date => {
        const result = new Date(date);
        result.setMonth(result.getMonth() + months);
        return result;
    };

    const addDaysAndMonths = (date: Date, days: number, months: number): Date => {
        const result = addDays(date, days);
        return addMonths(result, months);
    };

    const addYears = (date: Date, years: number): Date => {
        const result = new Date(date);
        result.setFullYear(result.getFullYear() + years);
        return result;
    };

    const formatDate = (unit: string, date: string | null, duration: number) => {
        if (date === null) return ''
    
        let newDate = new Date(date)
        if (unit === "j"){
          newDate = addDays(newDate, duration)
          return newDate.toISOString().slice(0, 10)
        }
        if ( unit === "m" ) {
          newDate = addMonths(newDate, duration)
          return newDate.toISOString().slice(0, 10)
        }
        if ( unit === "y" ) {
            newDate = addYears(newDate, duration)
            return newDate.toISOString().slice(0, 10)
        }
    
        // Return default Date
        return date?.slice(0, 10)
    }
    return {
        addDays,
        addMonths,
        addDaysAndMonths,
        addYears,
        formatDate
    }
}

export default useDate