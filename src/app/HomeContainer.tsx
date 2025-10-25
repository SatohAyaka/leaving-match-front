"use client";
import { useEffect, useState, useRef, useCallback } from "react";

import { ConvertBusTime } from "../types/BusTime";
import { Result, ResultResponce } from "../types/Result";
import { numberTimeToString } from "../utils/numberTimeToString";
import { stringTimeToNumber } from "../utils/stringTimeToNumber";

import WaitingDisplay from "../components/waintingDisplay";
import ResultDisplay from "../components/resultDisplay";
import BusTimeDisplay from "../components/selectBustimeDisplay";
import { notifyWithSound } from "../utils/notify/notifyWithSound";
import { initNotification } from "../utils/notify/initNotification";


type DisplayState = "WAITING" | "RESULT" | "SELECT";

type Props = {
  bustimeData: ConvertBusTime | null;
  resultData: Result | null;
  votes: { previous: number; nearest: number; next: number } | null;
};

export default function HomeContainer({ bustimeData, resultData, votes }: Props) {
  // 通知権限の確認
  useEffect(() => {
    initNotification();
  }, []);

  // 共通状態
  const previous = bustimeData?.previousTime;
  const nearest = bustimeData?.nearestTime;
  const next = bustimeData?.nextTime;

  console.log(previous, nearest, next);

  const [resultTime, setResultTime] = useState<string | null>(numberTimeToString(resultData?.BusTime ?? 0));
  const [resultMember, setResultMember] = useState<number | null>(resultData?.Member ?? 0);

  const [displayState, setDisplayState] = useState<DisplayState>("SELECT");

  const [previousVote, setPreviousVote] = useState<number>(votes?.previous ?? 0);
  const [nearestVote, setNearestVote] = useState<number>(votes?.nearest ?? 0);
  const [nextVote, setNextVote] = useState<number>(votes?.next ?? 0);

  const hasPostedRef = useRef(false);

  const prevDisplayRef = useRef<DisplayState | null>(null);

  useEffect(() => {
    // 前回が SELECT でない & 現在が SELECT の場合のみ通知
    if (displayState === "SELECT" && prevDisplayRef.current !== "SELECT") {
      notifyWithSound("投票画面が表示されました！");
    }
    prevDisplayRef.current = displayState;
  }, [displayState]);

  const handlePostAndUpdate = useCallback(async (bustimeId: number) => {
    if (hasPostedRef.current) return;
    hasPostedRef.current = true;
    try {
      const response = await fetch("/api/postResult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bustimeId }),
      });
      if (!response.ok) throw new Error("postResult失敗");

      const newResult: ResultResponce = await response.json();

      const newBusTime: number = stringTimeToNumber(newResult.BusTime);

      setResultTime(numberTimeToString(newBusTime));
      setResultMember(newResult.Member);
      setDisplayState("RESULT");

    } catch (err) {
      console.error("postResult失敗:", err);
    }
  }, []);

  const updateData = useCallback(async () => {
    try {
      if (!bustimeData) {
        console.warn("bustimeが登録されていません.");
        return;
      }
      const bustimeId = bustimeData.bustimeId;

      setPreviousVote(votes?.previous ?? 0);
      setNearestVote(votes?.nearest ?? 0);
      setNextVote(votes?.next ?? 0);

      const hasResult = resultData != null && resultData.BusTimeId === bustimeId && resultData.BusTime !== 0;

      // 現在時刻取得
      const now = new Date();
      const nowJST = new Date(now.toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }));
      const nowMinutes = nowJST.getHours() * 60 + nowJST.getMinutes();
      const endTimeMinutes = stringTimeToNumber(bustimeData.endTime);

      console.log(resultData?.dateJadge);

      // result がある場合
      if (hasResult) {
        if (nowMinutes < resultData.BusTime) {
          // → ResultDisplay
          setResultTime(numberTimeToString(resultData.BusTime));
          setResultMember(resultData.Member);
          console.log("nowMinutes < resultData.BusTime");
          setDisplayState("RESULT");

          // 現在時刻が BusTime を過ぎたら WAITING に
          if (nowMinutes >= resultData.BusTime) {
            setDisplayState("WAITING");
          } else if (resultData.dateJadge === false) {
            // 日付が異なる場合は無条件で WAITING
            setResultTime(null);
            setResultMember(null);
            setDisplayState("WAITING");
            return;
          }
        } else {
          // result.Bustime を過ぎた → WaitingDisplay
          setResultTime(null);
          setResultMember(null);
          setDisplayState("WAITING");
        }
      } else {
        if (nowMinutes <= endTimeMinutes) {
          // endtime前 → BusTimeDisplay
          setResultTime(null);
          setResultMember(null);
          setDisplayState("SELECT");
        } else if (bustimeData != null) {
          // endtime後 → postして無効result → ResultDisplay
          if (!hasPostedRef.current) {
            await handlePostAndUpdate(bustimeId);
          }
          // setResultTime(null);
          // setResultMember(null);
          console.log("postResult");
          setDisplayState("RESULT");
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [bustimeData, resultData, votes, handlePostAndUpdate]);

  useEffect(() => {
    updateData();
    const interval = setInterval(updateData, 60 * 1000); // 1分ごと
    return () => clearInterval(interval);
  }, [updateData]);

  switch (displayState) {
    case "WAITING":
      return <WaitingDisplay />;
    case "RESULT":
      return <ResultDisplay bustime={resultTime!} member={resultMember} />;
    case "SELECT":
      return <BusTimeDisplay previous={previous} nearest={nearest} next={next} previousVote={previousVote} nearestVote={nearestVote} nextVote={nextVote} />;
    default:
      return <WaitingDisplay />;
  }
}