export const formatDate = (date:Date) => date.toISOString().split("T")[0]

export const getDataRange = (days: number) => {
    const today = new Date()
    const pastDate = new Date()
    pastDate.setDate(today.getDate() - days)
    return `${formatDate(pastDate)},${formatDate(today)}`
}

export function formatSlugName(slug: string): string {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}