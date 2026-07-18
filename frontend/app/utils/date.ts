export function getToday(): string {
    return new Date().toLocaleDateString("sv-SE");
}

export function formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString("pt-BR", {
        timeZone: "UTC",
    });
}

export function formatDateInput(date: string): string {
    return date.split("T")[0];
}