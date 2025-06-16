export function minDiff(SectionMembersPrediction: number[]): [number[], number] {
    if (SectionMembersPrediction.length < 2) return [[], NaN];


    let minDiff = Infinity;
    for (let i = 1; i < SectionMembersPrediction.length; i++) {
        minDiff = Math.min(minDiff, SectionMembersPrediction[i] - SectionMembersPrediction[i - 1]);
    }

    const members: number[] = [];
    for (let i = 1; i < SectionMembersPrediction.length; i++) {
        if (SectionMembersPrediction[i] - SectionMembersPrediction[i - 1] === minDiff) {
            members.push(SectionMembersPrediction[i - 1], SectionMembersPrediction[i]);
        }
    }

    return [members, minDiff];
}