import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { numberTimeToString } from "../features/utils/recommendedDepartureTime/numberTimeToString";
import { getLatestResult } from "../features/utils/result/getLatestResult";
import { Result } from "../types/Result";

import "../styles/result.css";
import ResultDisplay from "./components/resultDisplay";

export default function ResultContainer() {
    const router = useRouter();
    const [time, setTime] = useState<string | null>(null);
    const [member, setMember] = useState<number | null>(null);
    const [bustimeNum, setBustimeNum] = useState<number | null>(null);
    const [serverNow, setServerNow] = useState<string | null>(null);

    useEffect(() => {
        if (!router.isReady) return;
        const fetchResult = async () => {
            try {
                const resultData: Result = await getLatestResult();
                setTime(numberTimeToString(resultData.Bustime));
                setBustimeNum(resultData.Bustime);
                setMember(resultData.Member);
                setServerNow(resultData.serverNow);
                if (resultData.Member == 0) {
                    // 「〜人と帰れそう」表示を消す
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchResult();
    }, [router]);


    useEffect(() => {
        if (!bustimeNum || !serverNow) return;

        if (!bustimeNum || !serverNow) return;

        const bustimeDate = new Date(bustimeNum);
        const serverDate = new Date(serverNow);

        const bustimeDay = bustimeDate.toISOString().slice(0, 10);
        const serverDay = serverDate.toISOString().slice(0, 10);

        if (bustimeDay !== serverDay) {
            router.push("/select");
            return;
        }

        const serverMinutes = serverDate.getHours() * 60 + serverDate.getMinutes();
        if (serverMinutes > bustimeNum) {
            router.push("/select");
            return;
        }

        const checkTime = () => {
            const now = new Date();
            const nowMinutes = now.getHours() * 60 + now.getMinutes();
            if (nowMinutes > bustimeNum) {
                router.push("/select");
            }
        };

        const interval = setInterval(checkTime, 60 * 1000);

        return () => clearInterval(interval);
    }, [bustimeNum, serverNow, router]);


    if (time === null) {
        return (
            <div className="display night">
                <div className="center-box">
                    <div className="message">取得中...</div>
                </div>
            </div>
        );
    }

    return <ResultDisplay bustime={time} member={member} />;
}