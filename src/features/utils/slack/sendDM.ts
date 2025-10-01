import { SelectBusTime } from "@/src/types/BusTime";
import { fetchApi } from "../../lib/fetchApi";

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

    await fetchApi(`/api/slack/notify?${query.toString()}`, {
        method: "POST",
    });
}