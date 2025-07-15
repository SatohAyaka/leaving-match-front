import { useEffect, useState } from "react";
import { numberTimeToString } from "../features/utils/recommendedDepartureTime/numberTimeToString";
import PredictionTime from "../features/utils/getDisplayData/predictionTime";
import BusTimeForm from "./form";
import { UserData } from "@/src/types/Stayer";

export default function DisplayTime() {
    const [data, setData] = useState<{
        start: number;
        end: number;
        mindiff: number;
        count: number;
        average: number;
        previousBus: string;
        nearestsBus: string;
        nextBus: string;
        member: UserData[];
        allusers: UserData[];
    } | null>(null);


    useEffect(() => {
        async function fetchData() {
            const data = await PredictionTime();
            setData(data);
        }
        fetchData(); // 初回呼び出し

        const interval = setInterval(() => {
            fetchData();
        }, 600000); // 毎時実行

        return () => clearInterval(interval);

        // let isCancelled = false;
        // let timeoutId: NodeJS.Timeout;

        // async function fetchAndSchedule() {
        //     try {
        //         const data = await PredictionTime();

        //         if (!isCancelled) {
        //             setData(data);

        //             // 次の実行を1分後に予約
        //             timeoutId = setTimeout(fetchAndSchedule, 60000);
        //         }
        //     } catch (err) {
        //         console.error("取得失敗:", err);
        //         // エラーが出ても次の実行を予約
        //         if (!isCancelled) {
        //             timeoutId = setTimeout(fetchAndSchedule, 60000);
        //         }
        //     }
        // }

        // fetchAndSchedule(); // 初回実行

        // return () => {
        //     isCancelled = true;
        //     clearTimeout(timeoutId);
        // };
    }, []);
    if (!data) return <p>読み込み中...</p>;
    const startTime = numberTimeToString(data.start);
    const endTime = numberTimeToString(data.end);
    return <>
        <p>30分区間{startTime}〜{endTime}</p>
        <p>{data?.count}人</p>
        <ul className="space-y-2">
            <li>{data?.mindiff}分差</li>
        </ul>
        <p>コア点:{numberTimeToString(data.average)}</p>
        <hr></hr>
        <h3>バス時刻</h3>
        <p>{data?.previousBus}</p>
        <p>{data?.nearestsBus}</p>
        <p>{data?.nextBus}</p>
        <hr></hr>
        <BusTimeForm previous={data?.previousBus} nearest={data?.nearestsBus} next={data?.nextBus} allUsers={data.allusers} />
        <hr></hr>
        <div>
            <p>対象メンバー</p>
            {data?.member.map((user) => (
                <p key={user.id}>{user.id}:{user.name}</p>
            ))}
        </div>
    </>
}