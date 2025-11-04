// pages/api/run.ts
import runJob from "../../jobs/run";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const ua = req.headers["user-agent"] || "";
    const forwardedFor = req.headers["x-forwarded-for"] || "";

    // GitHub Actions以外をブロック
    const isGithubActions =
        ua.includes("curl/") && typeof forwardedFor === "string" && forwardedFor.startsWith("4.");

    if (!isGithubActions) {
        console.log("Blocked request:", { ua, forwardedFor });
        return res.status(403).json({ error: "Forbidden: only GitHub Actions allowed" });
    }

    console.log("=== Github Actions ===");
    try {
        const result = await runJob();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: String(err) });
    }
}
