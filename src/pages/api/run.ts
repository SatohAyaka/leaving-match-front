import runJob from "@/src/jobs/run";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("=== Vercel Cron Job Start ===");
    try {
        const result = await runJob();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: String(err) });
    }
}
