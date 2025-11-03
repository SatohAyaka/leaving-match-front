// pages/api/run.ts
import runJob from "../../jobs/run";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("=== Vercel Cron Job Start ===");
    console.log("Headers:", req.headers);
    console.log("IP:", req.socket?.remoteAddress);
    try {
        const result = await runJob();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: String(err) });
    }
}
