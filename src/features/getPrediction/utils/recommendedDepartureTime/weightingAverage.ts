export function getAverage(predictions: number[], allPrediction: number[]): number {
    if (predictions.length === 0) return 0; // 要素が空のときは 0 を返す（他の扱い方も可能）

    const sum = predictions.reduce((acc, val) => acc + val, 0);
    const average = sum / predictions.length;
    let weightedSum = 0;
    let totalWeight = 0;

    for (const val of allPrediction) {
        const diff = Math.abs(val - average);
        const weight = diff === 0 ? 1 : 1 / diff;
        weightedSum += val * weight;
        totalWeight += weight; //1/diffの総和
    }

    // 重みの総和が0（全部中心と一致）なら fallback
    if (totalWeight === 0) return average;

    return weightedSum / totalWeight;
}