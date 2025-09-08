// src/pages/api/prediction/run.ts

import { postBustime } from "@/src/features/utils/bustime/postBustime";
import { findNearBuses } from "@/src/features/utils/getBusTimes/findNearBusTimes";
import { getStayers } from "@/src/features/utils/getStayersID/getStayersData";
import { getDayOfWeek } from "@/src/features/utils/getStayersPrediction/getDayOfWeek";
import { getPredicton } from "@/src/features/utils/getStayersPrediction/getPrediction";
import { postRecommended } from "@/src/features/utils/recommended/postRecommended";
import { findMaxCountInterval } from "@/src/features/utils/recommendedDepartureTime/getSection";
import { getSectionMembers } from "@/src/features/utils/recommendedDepartureTime/getSectionMembers";
import { minDiff } from "@/src/features/utils/recommendedDepartureTime/minDiff";
import { timeSort } from "@/src/features/utils/recommendedDepartureTime/timeSort";
import { getAverage } from "@/src/features/utils/recommendedDepartureTime/weightingAverage";
import { usePrediction } from "@/src/types/Prediction";
import { Recommended } from "@/src/types/Recommended";
import type { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log("=== Vercel Cron Job Start ===");

        const stayers = await getStayers();
        if (!stayers || stayers.length <= 1) {
            return res.status(200).json({ status: "skip", reason: "stayers <= 1" });
        }

        const weekDay: number = getDayOfWeek();
        const stayerPrediction: usePrediction[] = await getPredicton(weekDay, stayers);
        const sored: number[] = timeSort(stayerPrediction);
        const [start, end, count] = findMaxCountInterval(sored, 30);
        if (count == 1) {
            return res.status(200).json({ status: "skip", reason: "member == 1" });
        }

        const [members, mindiff] = minDiff(sored, start, end);
        if (members.length == 2 && mindiff == 30) {
            return res.status(200).json({ status: "skip", reason: "members diff == 30" });
        }
        const average = getAverage(members, sored);

        const memberIds = getSectionMembers(start, end, stayerPrediction);
        const recommended: Recommended = await postRecommended(Math.round(average), memberIds);
        if (recommended.status == false) {
            return res.status(200).json({ status: "skip", reason: "recommended status == false" });
        }

        const bustime = await findNearBuses(average);
        const bustimeId = await postBustime(recommended.id, bustime);

        return res.status(200).json({ status: "ok", bustimeId });
    } catch (err) {
        console.error("API呼び出し中にエラーが発生:", err);
        return res.status(500).json({ error: "サーバーエラーが発生しました" });
    }
}
