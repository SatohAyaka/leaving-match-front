// pages/api/allBustime.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { BusTime, ResponseBusTime } from "@/src/types/Bus";

export default async function allBustimeHandler(req: NextApiRequest, res: NextApiResponse) {
    const BASE_URL = process.env.BUS_API;

    if (!BASE_URL) {
        return res.status(500).json({ error: "APIのURLが設定されていません" });
    }

    const allTimes: BusTime[] = [];
    let offset = 0;

    try {
        while (true) {
            const response = await fetch(`${BASE_URL}?offset=${offset}`);
            if (!response.ok) {
                return res.status(response.status).json({ error: "外部API呼び出しに失敗しました" });
            }

            const data: ResponseBusTime = await response.json();

            if (!data.busState?.IsExist) {
                break;
            }

            allTimes.push({
                busId: offset,
                busTime: data.nextHourToYakusa * 60 + data.nextMinuteToYakusa,
            });

            offset++;
        }

        res.status(200).json(allTimes);
    } catch (err) {
        console.error("バスAPI通信エラー:", err);
        return res.status(500).json({ error: "サーバーでのバス情報取得に失敗しました" });
    }
}
