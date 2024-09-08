export function formatDate(params) {
    return new Date(params).toISOString().split('T')[0];
}