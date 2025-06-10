export function getAverage(predictions: number[]): number {
    if (predictions.length === 0) return 0; // 要素が空のときは 0 を返す（他の扱い方も可能）

    const sum = predictions.reduce((acc, val) => acc + val, 0);
    return sum / predictions.length;
}