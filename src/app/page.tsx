// app/page.tsx (Server Component)

import getLatestBusTime from "../lib/api/bustime/getLatestBustime";
import getLatestResult from "../lib/api/result/getLatestResult";
import getVote from "../lib/api/vote/getVote";
import HomeContainer from "./HomeContainer";

export default async function Page() {
    // サーバー側でデータ取得
    const bustimeData = await getLatestBusTime();
    const resultData = await getLatestResult();
    const votes = await getVote(bustimeData.bustimeId);

    // client component に props で渡す
    return (
        <HomeContainer
            bustimeData={bustimeData}
            resultData={resultData}
            votes={votes}
        />
    );
}
