export function minDiff(SectionMembersPrediction: number[], start: number, end: number): [number[], number] {
    if (SectionMembersPrediction.length < 2) return [[], 30];


    //数値化した時刻データの最短距離を調べる
    let minDiff = 30;
    for (let i = 1; i < SectionMembersPrediction.length; i++) {
        if (start <= SectionMembersPrediction[i - 1] && SectionMembersPrediction[i] <= end) {
            minDiff = Math.min(minDiff, SectionMembersPrediction[i] - SectionMembersPrediction[i - 1]);
        }
    }

    //数値化した時刻データの最も近い点を調べる
    const members: number[] = [];
    for (let i = 1; i < SectionMembersPrediction.length; i++) {
        if (SectionMembersPrediction[i] - SectionMembersPrediction[i - 1] === minDiff) {
            members.push(SectionMembersPrediction[i - 1], SectionMembersPrediction[i]);
        }
    }

    return [members, minDiff];
}