// pages/api/run.ts
import testJob from "@/src/test/jobs/test";
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

    console.log("=== Github Actions test ===");
    try {
        const result = await testJob();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: String(err) });
    }
}
