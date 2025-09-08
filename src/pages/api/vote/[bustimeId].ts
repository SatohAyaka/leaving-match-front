// pages/api/vote/[bustimeId].ts

import { Vote, VoteResponse } from '@/src/types/Vote';
import type { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.LEAVING_MATCH_API;
const ENDPOINT = process.env.LEAVING_MATCH_VOTE;

export default async function getVoteHandler(req: NextApiRequest, res: NextApiResponse) {
    if (!BASE_URL || !ENDPOINT) {
        return res.status(500).json({ error: "APIのURLが設定されていません" });
    }
    const { bustimeId } = req.query;
    const apiUrl = new URL(`${BASE_URL}${ENDPOINT}/${bustimeId}`);
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return res.status(response.status).json({ error: "外部API呼び出しに失敗しました" });
        }
        const data: VoteResponse[] = await response.json();
        let previousVote = 0;
        let nearestVote = 0;
        let nextVote = 0;

        data.forEach(voteData => {
            if (voteData.previous) previousVote += 1;
            if (voteData.nearest) nearestVote += 1;
            if (voteData.next) nextVote += 1;
        });

        const converted: Vote = {
            previous: previousVote,
            nearest: nearestVote,
            next: nextVote,
        }
        return res.status(response.status).json(converted);
    } catch (err) {
        console.error("API呼び出し中にエラーが発生:", err);
        return res.status(500).json({ error: "サーバーエラーが発生しました" });
    }
}