import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "./../styles/result.css";


export default function ResultPage() {
    const router = useRouter();
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        if (!router.isReady) return; // router.query が初期は undefined のため

        const param = router.query.time;

        if (typeof param === "string") {
            setTime(param);
        } else {
            router.push("/home");
        }
    }, [router]);

    return (
        <body>
            <div className={`display night`}>
                <div className="balloon">
                    5人くらいと<br />
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