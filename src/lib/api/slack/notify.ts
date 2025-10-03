// lib/api/slack/notify.ts

import { SelectBusTime } from "@/src/types/BusTime";

const BASE_URL = process.env.LEAVING_MATCH_API;
const ENDPOINT = process.env.SLACK_DM_ENDPOINT;

export default async function sendDM(memberIds: number[], bustimes: SelectBusTime) {
    if (!BASE_URL || !ENDPOINT) {
        throw new Error("APIのURLが設定されていません");
    }
    const query = new URLSearchParams();
    memberIds.forEach(id => query.append("member", id.toString()));
    if (bustimes.previousTime !== 0) {
        query.append("bustime", bustimes.previousTime.toString());
    }
    if (bustimes.nearestTime !== 0) {
        query.append("bustime", bustimes.nearestTime.toString());
    }
    if (bustimes.nextTime !== 0) {
        query.append("bustime", bustimes.nextTime.toString());
    }

    const apiUrl = `${BASE_URL}${ENDPOINT}?${query.toString()}`;

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) {
        throw new Error("外部API呼び出しに失敗しました");
    }
    return;
}