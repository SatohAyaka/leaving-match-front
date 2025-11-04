// pages/api/run.ts
import runJob from "../../jobs/run";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const auth = req.headers["authorization"];
    const token = process.env.CRON_SECRET;

    if (!auth || auth !== `Bearer ${token}`) {
        console.log("Blocked request:", {
            ua: req.headers["user-agent"],
            forwardedFor: req.headers["x-forwarded-for"],
        });
        return res.status(403).json({ error: "Forbidden: invalid token" });
    }

    console.log("=== Github Actions ===");
    try {
        const result = await runJob();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: String(err) });
    }
}
