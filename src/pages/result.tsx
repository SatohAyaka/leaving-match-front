import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { numberTimeToString } from "../features/utils/recommendedDepartureTime/numberTimeToString";
import { getLatestResult } from "../features/utils/result/getLatestResult";
import { Result } from "../types/Result";

import "../styles/result.css";

export default function ResultDisplay() {
    const router = useRouter();
    const [time, setTime] = useState<string | null>(null);
    const [member, setMember] = useState<number | null>(null);

    useEffect(() => {
        if (!router.isReady) return;
        const fetchResult = async () => {
            try {
                const resultData: Result = await getLatestResult();
                setTime(numberTimeToString(resultData.Bustime));
                setMember(resultData.Member);
                if (resultData.Member == 0) {
                    // 「〜人と帰れそう」表示を消す
                }
            } catch (err) {
                console.error(err);
                router.push("/select");
            }
        };
        fetchResult();
    }, [router]);

    return (
        <body>
            <div className={`display night`}>
                <div className="balloon">
                    {member !== null ? `${member}人くらいと` : "数人と"}<br />
                    一緒に帰れるかも？
                </div>
                <div className="center-box">
                    <div className="time">{time}</div>
                    <div className="message">のバスに乗りませんか？</div>
                </div>
            </div>
        </body>
    );
}