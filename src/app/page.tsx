// app/page.tsx (Server Component)

import getLatestBusTime from "../lib/api/bustime/getLatestBustime";
import getLatestResult from "../lib/api/result/getLatestResult";
import getVote from "../lib/api/vote/getVote";
import AutoRefresher from "./AutoRefresher";
import HomeContainer from "./HomeContainer";

export const revalidate = 0;

export default async function Page() {
    // サーバー側でデータ取得
    let bustimeData = null;
    let resultData = null;
    let votes = null;

    try {
        bustimeData = await getLatestBusTime();
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
