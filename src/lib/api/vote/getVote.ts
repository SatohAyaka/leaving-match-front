// lib/api/vote/getVote.ts

import { Vote, VoteResponse } from '@/src/types/Vote';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ENDPOINT = process.env.LEAVING_MATCH_VOTE;

export default async function getVote(bustimeId: number): Promise<Vote> {
    if (!BASE_URL || !ENDPOINT) {
        throw new Error("APIのURLが設定されていません");
    }
    const apiUrl = new URL(`${BASE_URL}${ENDPOINT}/${bustimeId}`);
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("外部API呼び出しに失敗しました");
    }
    const data: VoteResponse[] = await response.json();
    let previousVote = 0;
    let nearestVote = 0;
    let nextVote = 0;

    data.forEach(voteData => {
        if (voteData.Previous) previousVote += 1;
        if (voteData.Nearest) nearestVote += 1;
        if (voteData.Next) nextVote += 1;
    });

    const converted: Vote = {
        previous: previousVote,
        nearest: nearestVote,
        next: nextVote,
    }
    return converted;
}