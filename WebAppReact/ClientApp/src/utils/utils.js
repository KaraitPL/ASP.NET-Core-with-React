export function formatDate(dateString) {
    const date = new Date(dateString);

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Miesiące są zero-indeksowane
    const year = date.getFullYear();

    // Formatowanie w stylu DD-MM-YYYY
    return `${day}.${month}.${year}`;
}