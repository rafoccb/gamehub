export const formatDate = (date:Date) => date.toISOString().split("T")[0]

export const getDataRange = (days: number) => {
    const today = new Date()
    const pastDate = new Date()
    pastDate.setDate(today.getDate() - days)
    return `${formatDate(pastDate)},${formatDate(today)}`
}