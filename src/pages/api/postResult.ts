// pages/api/postResult.ts
import postResult from "../../lib/api/result/postResult";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function postResultHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method Not Allowed" });
        return;
    }

    try {
        const { bustimeId } = req.body;
        if (typeof bustimeId !== "number") {
            return res.status(400).json({ error: "bustimeIdが無効です" });
        }
        const resultData = await postResult(bustimeId);
        res.status(200).json(resultData);
    } catch (err) {
        console.error("postResult API error:", err);
        res.status(500).json({ error: "サーバー側でエラーが発生しました" });
    }
}
