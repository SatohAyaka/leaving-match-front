import { SelectBusTime } from "@/src/types/BusTime";

export default async function sendDMs(memberIds: number[], bustimes: SelectBusTime) {
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


    const response = await fetch(`${process.env.BASE_URL}/api/slack/notify?${query.toString()}`, {
        method: "POST",
    });

    if (!response.ok) {
        throw new Error(`推奨時刻保存失敗: ${response.status}`);
    }
    return;
}