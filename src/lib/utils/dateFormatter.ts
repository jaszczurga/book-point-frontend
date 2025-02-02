export function formatDateToPolish(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("pl-PL");
}

export function getDaysLeft(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffInMs = end.getTime() - start.getTime();

    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
}