import { BusTime, ResponseBusTime } from "@/src/types/Bus";

const BAS_URL = process.env.NEXT_PUBLIC_BUS_API;

export async function GetBusTime(): Promise<BusTime[]> {
    const allTimes: BusTime[] = [];
    let offset = 0;

    while (true) {
        const res = await fetch(`${BAS_URL}?offset=${offset}`);
        console.log(res);
        const data: ResponseBusTime = await res.json();

        if (data.busState.IsExist === false) {
            break;
        }

        allTimes.push({
            busId: offset,
            busTime: data.nextHourToYakusa * 60 + data.nextMinuteToYakusa,
        });

        offset++;
    }

    // console.log(allTimes);
    return allTimes;

}