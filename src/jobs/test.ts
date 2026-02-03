// src/jobs/run.ts

import { postBustime } from "@/src/lib/api/bustime/postBustime";
import { findNearBuses } from "@/src/utils/findNearBusTimes";
import getStayers from "../lib/api/staywatch/stayers";
import { getDayOfWeek } from "@/src/utils/getDayOfWeek";
import getPrediction from "../lib/api/staywatch/getPrediction";
import postRecommended from "../lib/api/recommended/postRecommended";
import { findMaxCountInterval } from "@/src/utils/getSection";
import { getSectionMembers } from "@/src/utils/getSectionMembers";
// import { minDiff } from "@/src/utils/minDiff";
import { timeSort } from "@/src/utils/timeSort";
// import { getAverage } from "@/src/utils/weightingAverage";
import sendDM from "../lib/api/slack/notify";
import { usePrediction } from "@/src/types/Prediction";
import { Recommended } from "@/src/types/Recommended";

export default async function testJob() {
    console.log("=== TEST JOB START ===");
    const stayers = await getStayers().catch((e) => {
        console.error("getStayers error:", e);
        throw e;
    });
    if (!stayers || stayers.length <= 1) {
        return { status: "skip", reason: "stayers <= 1" };
    }

    const weekDay: number = getDayOfWeek();
    const stayerPrediction: usePrediction[] = await getPrediction(weekDay, stayers).catch((e) => {
        console.error("getPrediction error:", e);
        throw e;
    });
    const sored: number[] = timeSort(stayerPrediction);
    const [start, end, count] = findMaxCountInterval(sored, 30);
    console.log("interval:", { start, end, count });
    if (count == 1) {
        return { status: "skip", reason: "member == 1" };
    }

    // const [members, mindiff] = minDiff(sored, start, end);
    // console.log("members/mindiff:", members, mindiff);
    // if (members.length == 2 && mindiff == 30) {
    //     return { status: "skip", reason: "members diff == 30" };
    // }
    // const average = getAverage(members, sored);
    const average = 1215;
    // if (average == 0) {
    //     return { status: "skip", reason: "average == 0" };
    // }

    const memberIds = getSectionMembers(start, end, stayerPrediction);
    // if (memberIds.length == 0) {
    //     return { status: "skip", reason: "member == 0" };
    // }
    const recommended: Recommended = await postRecommended(Math.round(average), memberIds).catch((e) => {
        console.error("postRecommended error:", e);
        throw e;
    });

    if (recommended.Status == false) {
        return { status: "skip", reason: "recommended status == false" };
    }

    const bustime = await findNearBuses(average);
    const bustimeId = await postBustime(recommended.RecommendedId, bustime).catch((e) => {
        console.error("postBustime error:", e);
        throw e;
    });

    // await sendDM(memberIds, bustime);
    await sendDM([90], bustime);

    console.log("=== TEST JOB END ===");
    return { status: "ok", bustimeId };
}
