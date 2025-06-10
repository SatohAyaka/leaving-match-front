export const findMaxCountInterval = (timeToNumber: number[], width: number): [number, number, number] => {
    let maxCount = 0;
    let bestStart = 0;
    let left = 0;


    for (let right = 0; right < timeToNumber.length; right++) {
        while (timeToNumber[right] - timeToNumber[left] >= width) {
            left++;
        }
        const count = right - left + 1;
        if (count > maxCount) {
            maxCount = count;
            bestStart = timeToNumber[left];
        }
    }
    return [
        bestStart, bestStart + width, maxCount,
    ];
}