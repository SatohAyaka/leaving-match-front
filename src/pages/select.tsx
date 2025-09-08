import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SelectBusTime } from "../types/BusTime";
import { getLatestBustime } from "../features/utils/bustime/getLatestBustime";
import { numberTimeToString } from "../features/utils/recommendedDepartureTime/numberTimeToString";

import "../styles/result.css";

export default function SelectDisplay() {
    const router = useRouter();
    const [previous, setPrevious] = useState<string | null>(null);
    const [nearest, setNearest] = useState<string | null>(null);
    const [next, setNext] = useState<string | null>(null);

    useEffect(() => {
        if (!router.isReady) return;
        const fetchResult = async () => {
            try {
                const bustimeData: SelectBusTime = await getLatestBustime();
                setPrevious(numberTimeToString(bustimeData.previousTime));
                setNearest(numberTimeToString(bustimeData.nearestTime));
                setNext(numberTimeToString(bustimeData.nextTime));
            } catch (err) {
                console.error(err);
                router.push("/result");
            }
        };
        fetchResult();
    }, [router]);

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