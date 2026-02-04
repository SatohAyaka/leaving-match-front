// app/page.tsx (Server Component)

import getLatestBusTime from "../lib/api/bustime/getLatestBustime";
import getLatestResult from "../lib/api/result/getLatestResult";
import getVote from "../lib/api/vote/getVote";
import HomeContainer from "../test/app/HomeContainer";
import { ConvertBusTime } from "../types/BusTime";
import AutoRefresher from "./AutoRefresher";
// import HomeContainer from "./HomeContainer";

export const revalidate = 0;

const DEFAULT_BUSTIME_DATA: ConvertBusTime = {
    bustimeId: 0,
    previousTime: "0:00",
    nearestTime: "0:00",
    nextTime: "0:00",
    endTime: "0:00",
};

export default async function Page() {
    // サーバー側でデータ取得
    let bustimeData = DEFAULT_BUSTIME_DATA;
    let resultData = null;
    let votes = null;

    try {
        bustimeData = await getLatestBusTime();
        console.log(bustimeData);
    } catch (err) {
        console.error("getLatestBusTime failed:", err);
    }

    try {
        resultData = await getLatestResult();
    } catch (err) {
        console.error("getLatestResult failed:", err);
    }

    try {
        if (bustimeData?.bustimeId) {
            votes = await getVote(bustimeData.bustimeId);
        }
    } catch (err) {
        console.error("getVote failed:", err);
    }


    // client component に props で渡す
    return (
        <>
            <AutoRefresher />
            <HomeContainer
                bustimeData={bustimeData}
                resultData={resultData}
                votes={votes}
            />
        </>
    );
}
