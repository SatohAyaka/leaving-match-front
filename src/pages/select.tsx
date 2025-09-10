import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ConvertBusTime } from "../types/BusTime";
import { getLatestBustime } from "../features/utils/bustime/getLatestBustime";

import "../styles/result.css";
import { Result } from "../types/Result";
import { getLatestResult } from "../features/utils/result/getLatestResult";
import { stringTimeToNumber } from "../features/utils/recommendedDepartureTime/stringTimeToNumber";

export default function SelectDisplay() {
    const router = useRouter();
    const [previous, setPrevious] = useState<string | null>(null);
    const [nearest, setNearest] = useState<string | null>(null);
    const [next, setNext] = useState<string | null>(null);
    const [endtime, setEndtime] = useState<number | null>(null);
    const [serverNow, setServerNow] = useState<string | null>(null);

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
                const resultData: Result = await getLatestResult();
                if (bustimeData.bustimeId == resultData.BustimeId) {
                    //待機画面に
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchResult();
    }, [router]);

    useEffect(() => {
        if (!endtime || !serverNow) return;

        const serverDate = new Date(serverNow);
        const serverMinutes = serverDate.getHours() * 60 + serverDate.getMinutes();
        if (serverMinutes > endtime) {
            router.push("/result");
            return;
        }

        const checkTime = () => {
            const now = new Date();
            const nowMinutes = now.getHours() * 60 + now.getMinutes();
            if (nowMinutes > endtime) {
                router.push("/result");
            }
        };

        const interval = setInterval(checkTime, 60 * 1000);

        return () => clearInterval(interval);
    }, [endtime, serverNow, router]);

    return (
        <body>
            <div className={`display night`}>
                <div className="center-box">
                    <div className="time">{previous}</div>
                    <div className="time">{nearest}</div>
                    <div className="time">{next}</div>
                    <div className="message">のバスに乗りませんか？</div>
                </div>
            </div>
        </body>
    );
}