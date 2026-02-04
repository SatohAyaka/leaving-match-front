// src/jobs/run.ts

import { postBustime } from "@/src/lib/api/bustime/postBustime";
import { findNearBuses } from "@/src/utils/findNearBusTimes";
import postRecommended from "../../lib/api/recommended/postRecommended";
import sendDM from "../../lib/api/slack/notify";
import { Recommended } from "@/src/types/Recommended";

export default async function testJob() {
    console.log("=== TEST JOB START ===");
    //メンバを自分に
    const memberIds = [90];

    //ここは夕方の時刻に（一旦18:40）
    const average = 1185;

    const recommended: Recommended = await postRecommended(average, memberIds).catch((e) => {
        console.error("postRecommended error:", e);
        throw e;
    });

    const bustime = await findNearBuses(average);
    const bustimeId = await postBustime(recommended.RecommendedId, bustime).catch((e) => {
        console.error("postBustime error:", e);
        throw e;
    });

    // 自分のみにメッセージ送る
    await sendDM([90], bustime);

    console.log("=== TEST JOB END ===");
    return { status: "ok", bustimeId };
}
