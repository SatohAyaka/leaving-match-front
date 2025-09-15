import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ConvertBusTime } from "../types/BusTime";
import { getLatestBustime } from "../features/utils/bustime/getLatestBustime";

import "../styles/result.css";
import { Result } from "../types/Result";
import { getLatestResult } from "../features/utils/result/getLatestResult";
import { stringTimeToNumber } from "../features/utils/recommendedDepartureTime/stringTimeToNumber";
import WaitingDisplay from "./components/waintingDisplay";
import BusTimeDisplay from "./components/selectBustimeDisplay";
import { postResult } from "../features/utils/result/postResult";

export default function SelectDisplay() {
    const router = useRouter();
    const [previous, setPrevious] = useState<string | null>(null);
    const [nearest, setNearest] = useState<string | null>(null);
    const [next, setNext] = useState<string | null>(null);
    const [isWaiting, setIsWaiting] = useState(false);

    const hasPostedRef = useRef(false);

    const handlePostAndRedirect = useCallback(async (bustimeId: number) => {
        try {
            hasPostedRef.current = true; // 二重実行防止
            await postResult(bustimeId);
            router.push("/result");
        } catch (err) {
            console.error("postResult失敗:", err);
        }
    }, [router]);

    useEffect(() => {
        if (!router.isReady) return;

        const fetchResult = async () => {
            try {
                const bustimeData: ConvertBusTime = await getLatestBustime();
                setPrevious(bustimeData.previousTime);
                setNearest(bustimeData.nearestTime);
                setNext(bustimeData.nextTime);
                const endtime = stringTimeToNumber(bustimeData.endTime);
                const serverNow = bustimeData.serverNow;
                const bustimeId = bustimeData.bustimeId;

                const resultData: Result = await getLatestResult();
                setIsWaiting(bustimeData.bustimeId === resultData.BustimeId);

                const serverMinutes = new Date(bustimeData.serverNow).getHours() * 60 + new Date(serverNow).getMinutes();
                if (serverMinutes > endtime && !(bustimeId === resultData.BustimeId) && !hasPostedRef.current) {
                    handlePostAndRedirect(bustimeData.bustimeId);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchResult(); // 初回取得
        const interval = setInterval(fetchResult, 60 * 1000); // 1分ごと

        return () => clearInterval(interval);
    }, [router, handlePostAndRedirect]);


    if (isWaiting) {
        return <WaitingDisplay />;
    }

    return <BusTimeDisplay previous={previous} nearest={nearest} next={next} />;
}