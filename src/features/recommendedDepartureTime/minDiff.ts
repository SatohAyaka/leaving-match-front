export function minDiff(SectionMembers: number[]): [number[], number] {
    if (SectionMembers.length < 2) return [[], NaN];


    let minDiff = Infinity;
    for (let i = 1; i < SectionMembers.length; i++) {
        minDiff = Math.min(minDiff, SectionMembers[i] - SectionMembers[i - 1]);
    }

    const members: number[] = [];
    for (let i = 1; i < SectionMembers.length; i++) {
        if (SectionMembers[i] - SectionMembers[i - 1] === minDiff) {
            members.push(SectionMembers[i - 1], SectionMembers[i]);
        }
    }

    return [members, minDiff];
}