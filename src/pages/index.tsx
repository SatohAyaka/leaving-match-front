import { useRouter } from "next/router";
import { useEffect, useState, useRef, useCallback } from "react";
import { ConvertBusTime } from "../types/BusTime";
import { Result } from "../types/Result";

import { getLatestResult } from "../features/utils/result/getLatestResult";
import { stringTimeToNumber } from "../features/utils/recommendedDepartureTime/stringTimeToNumber";
import { numberTimeToString } from "../features/utils/recommendedDepartureTime/numberTimeToString";
import { postResult } from "../features/utils/result/postResult";

import WaitingDisplay from "../components/waintingDisplay";
import BusTimeDisplay from "../components/selectBustimeDisplay";
import ResultDisplay from "../components/resultDisplay";
import { getCurrentVote } from "../features/utils/vote/getCurrentVote";
import getLatestBustime from "./api/bustime/getLatestBustime";

type DisplayState = "WAITING" | "RESULT" | "SELECT";

export default function HomeContainer() {
  const router = useRouter();

  // 共通状態
  const [previous, setPrevious] = useState<string | null>(null);
  const [nearest, setNearest] = useState<string | null>(null);
  const [next, setNext] = useState<string | null>(null);

  const [resultTime, setResultTime] = useState<string | null>(null);
  const [resultMember, setResultMember] = useState<number | null>(null);

  const [displayState, setDisplayState] = useState<DisplayState>("SELECT");

  const [previousVote, setPreviousVote] = useState<number>(0);
  const [nearestVote, setNearestVote] = useState<number>(0);
  const [nextVote, setNextVote] = useState<number>(0);


  const hasPostedRef = useRef(false);

  const handlePostAndUpdate = useCallback(async (bustimeId: number) => {
    if (hasPostedRef.current) return;
    hasPostedRef.current = true;
    try {
      await postResult(bustimeId);
      const resultData = await getLatestResult();
      setResultTime(numberTimeToString(resultData.BusTime));
      setResultMember(resultData.Member);
    } catch (err) {
      console.error("postResult失敗:", err);
    }
  }, []);

  const updateData = useCallback(async () => {
    try {
      // 最新バス時刻取得
      const bustimeData: ConvertBusTime = await getLatestBustime();
      setPrevious(bustimeData.previousTime);
      setNearest(bustimeData.nearestTime);
      setNext(bustimeData.nextTime);

      const bustimeId = bustimeData.bustimeId;
      const endtime = stringTimeToNumber(bustimeData.endTime);

      const votes = await getCurrentVote();
      setPreviousVote(votes.previous);
      setNearestVote(votes.nearest);
      setNextVote(votes.next);

      // 最新 result 取得
      const resultData: Result = await getLatestResult();
      const hasResult = resultData.BusTimeId === bustimeId && resultData.BusTime !== 0;

      // 現在時刻取得
      const now = new Date();
      const nowMinutes = now.getHours() * 60 + now.getMinutes();

      // result がある場合
      if (hasResult) {
        if (nowMinutes < resultData.BusTime) {
          // → ResultDisplay
          setResultTime(numberTimeToString(resultData.BusTime));
          setResultMember(resultData.Member);
          setDisplayState(prev => (prev !== "RESULT" ? "RESULT" : prev));
        } else {
          // result.Bustime を過ぎた → WaitingDisplay
          setResultTime(null);
          setResultMember(null);
          setDisplayState(prev => (prev !== "WAITING" ? "WAITING" : prev));
        }
      } else {
        if (nowMinutes <= endtime) {
          // endtime前 → BusTimeDisplay
          setResultTime(null);
          setResultMember(null);
          setDisplayState(prev => (prev !== "SELECT" ? "SELECT" : prev));
        } else {
          // endtime後 → post して無効result → ResultDisplay
          if (!hasPostedRef.current) {
            await handlePostAndUpdate(bustimeId);
          }
          setResultTime(null);
          setResultMember(null);
          setDisplayState(prev => (prev !== "RESULT" ? "RESULT" : prev));
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [handlePostAndUpdate]);

  useEffect(() => {
    if (!router.isReady) return;

    updateData();
    const interval = setInterval(updateData, 60 * 1000); // 1分ごと
    return () => clearInterval(interval);
  }, [router, updateData]);

  switch (displayState) {
    case "WAITING":
      return <WaitingDisplay />;
    case "RESULT":
      return <ResultDisplay bustime={resultTime!} member={resultMember} />;
    case "SELECT":
    default:
      return <BusTimeDisplay previous={previous} nearest={nearest} next={next} previousVote={previousVote} nearestVote={nearestVote} nextVote={nextVote} />;
  }
}