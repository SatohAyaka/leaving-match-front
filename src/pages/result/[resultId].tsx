import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "../../styles/result.css";
import { Result } from "../../types/Result";
import { numberTimeToString } from "../../features/utils/recommendedDepartureTime/numberTimeToString";


export default function ResultPage() {
    const router = useRouter();
    const [time, setTime] = useState<string | null>(null);
    const [member, setMember] = useState<number | null>(null);
    const { resultId } = router.query;

    useEffect(() => {
        if (!router.isReady) return; // router.query が初期は undefined のため

        if (typeof resultId === "string") {
            // setTime(param);
            const fetchResult = async () => {
                try {
                    const res = await fetch(`/api/result?id=${resultId}`);
                    if (!res.ok) {
                        throw new Error("API fetch error");
                    }
                    const data: Result = await res.json();
                    setTime(numberTimeToString(data.Bustime));
                    setMember(data.Member);
                } catch (err) {
                    console.error(err);
                    router.push("/home");
                }
            };
            fetchResult();
        } else {
            router.push("/home");
        }
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