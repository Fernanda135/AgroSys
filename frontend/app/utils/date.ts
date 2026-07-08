export function formatDate(date: string | Date | null | undefined) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("pt-BR");
}