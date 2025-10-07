// src/jobs/run.ts

import { postBustime } from "@/src/lib/api/bustime/postBustime";
import { findNearBuses } from "@/src/utils/findNearBusTimes";
import getStayers from "../lib/api/staywatch/stayers";
import { getDayOfWeek } from "@/src/utils/getDayOfWeek";
import getPrediction from "../lib/api/staywatch/getPrediction";
import postRecommended from "../lib/api/recommended/postRecommended";
import { findMaxCountInterval } from "@/src/utils/getSection";
import { getSectionMembers } from "@/src/utils/getSectionMembers";
import { minDiff } from "@/src/utils/minDiff";
import { timeSort } from "@/src/utils/timeSort";
import { getAverage } from "@/src/utils/weightingAverage";
import sendDM from "../lib/api/slack/notify";
import { usePrediction } from "@/src/types/Prediction";
import { Recommended } from "@/src/types/Recommended";

export default async function runJob() {
    console.log("=== Vercel Cron runJob Start ===");
    const stayers = await getStayers();
    if (!stayers || stayers.length <= 1) {
        return { status: "skip", reason: "stayers <= 1" };
    }

    const weekDay: number = getDayOfWeek();
    const stayerPrediction: usePrediction[] = await getPrediction(weekDay, stayers);
    const sored: number[] = timeSort(stayerPrediction);
    const [start, end, count] = findMaxCountInterval(sored, 30);
    if (count == 1) {
        return { status: "skip", reason: "member == 1" };
    }

    const [members, mindiff] = minDiff(sored, start, end);
    if (members.length == 2 && mindiff == 30) {
        return { status: "skip", reason: "members diff == 30" };
    }
    const average = getAverage(members, sored);

    const memberIds = getSectionMembers(start, end, stayerPrediction);
    const recommended: Recommended = await postRecommended(Math.round(average), memberIds);
    if (recommended.status == false) {
        return { status: "skip", reason: "recommended status == false" };
    }

    const bustime = await findNearBuses(average);
    const bustimeId = await postBustime(recommended.id, bustime);

    // await sendDMs(memberIds, bustime);
    await sendDM([90], bustime);

    return { status: "ok", bustimeId };
}
