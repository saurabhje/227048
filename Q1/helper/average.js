export function calculateAvg(array) {
    if (array.length === 0) return 0;

    const sum = array.reduce((acc, val) => acc + val, 0);
    const avg = sum / array.length;
    return Math.round(avg * 100) / 100;
}