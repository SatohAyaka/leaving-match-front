import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
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
    const [endtime, setEndtime] = useState<number | null>(null);
    const [serverNow, setServerNow] = useState<string | null>(null);
    const [isWaiting, setIsWaiting] = useState(false);
    const [bustimeId, setBustimeId] = useState<number | null>(null);

    const hasPostedRef = useRef(false);

    useEffect(() => {
        if (!router.isReady) return;
        const fetchResult = async () => {
            try {
                const bustimeData: ConvertBusTime = await getLatestBustime();
                setPrevious(bustimeData.previousTime);
                setNearest(bustimeData.nearestTime);
                setNext(bustimeData.nextTime);
                setEndtime(stringTimeToNumber(bustimeData.endTime));
                setServerNow(bustimeData.serverNow);
                setBustimeId(bustimeData.bustimeId);
                const resultData: Result = await getLatestResult();
                if (bustimeData.bustimeId === resultData.BustimeId) {
                    setIsWaiting(true);
                } else {
                    setIsWaiting(false);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchResult();
        const interval = setInterval(fetchResult, 60 * 1000);

        return () => clearInterval(interval);
    }, [router]);

    useEffect(() => {
        if (!endtime || !serverNow || !bustimeId) return;

        const serverDate = new Date(serverNow);
        const serverMinutes = serverDate.getHours() * 60 + serverDate.getMinutes();

        if (serverMinutes > endtime && !isWaiting && !hasPostedRef.current) {
            handlePostAndRedirect(bustimeId);
            return;
        }

        const checkTime = () => {
            const now = new Date();
            const nowMinutes = now.getHours() * 60 + now.getMinutes();
            if (nowMinutes > endtime && !isWaiting && !hasPostedRef.current) {
                handlePostAndRedirect(bustimeId);
            }
        };

        const interval = setInterval(checkTime, 60 * 1000);

        return () => clearInterval(interval);
    }, [endtime, serverNow, bustimeId, isWaiting]);

    const handlePostAndRedirect = async (bustimeId: number) => {
        try {
            hasPostedRef.current = true; // ← 二重実行防止
            await postResult(bustimeId);
            router.push("/result");
        } catch (err) {
            console.error("postResult失敗:", err);
        }
    };
    if (isWaiting) {
        return <WaitingDisplay />;
    }


    return <BusTimeDisplay previous={previous} nearest={nearest} next={next} />;
}