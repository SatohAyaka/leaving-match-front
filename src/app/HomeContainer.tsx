"use client";
import { useEffect, useState, useRef, useCallback } from "react";

import { ConvertBusTime } from "../types/BusTime";
import { Result } from "../types/Result";
import postResult from "../lib/api/result/postResult";
import { numberTimeToString } from "../utils/numberTimeToString";
import { stringTimeToNumber } from "../utils/stringTimeToNumber";

import WaitingDisplay from "../components/waintingDisplay";
import ResultDisplay from "../components/resultDisplay";
import BusTimeDisplay from "../components/selectBustimeDisplay";


type DisplayState = "WAITING" | "RESULT" | "SELECT";

type Props = {
  bustimeData: ConvertBusTime;
  resultData: Result;
  votes: { previous: number; nearest: number; next: number };
};

export default function HomeContainer({ bustimeData, resultData, votes }: Props) {
  // 共通状態
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [previous, setPrevious] = useState<string | null>(bustimeData.previousTime);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nearest, setNearest] = useState<string | null>(bustimeData.nearestTime);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [next, setNext] = useState<string | null>(bustimeData.nextTime);

  const [resultTime, setResultTime] = useState<string | null>(numberTimeToString(resultData.BusTimeId));
  const [resultMember, setResultMember] = useState<number | null>(resultData.Member);

  const [displayState, setDisplayState] = useState<DisplayState>("SELECT");

  const [previousVote, setPreviousVote] = useState<number>(votes.previous);
  const [nearestVote, setNearestVote] = useState<number>(votes.nearest);
  const [nextVote, setNextVote] = useState<number>(votes.next);


  const hasPostedRef = useRef(false);

  const handlePostAndUpdate = useCallback(async (bustimeId: number) => {
    if (hasPostedRef.current) return;
    hasPostedRef.current = true;
    try {
      await postResult(bustimeId);
      setResultTime(numberTimeToString(resultData.BusTime));
      setResultMember(resultData.Member);
    } catch (err) {
      console.error("postResult失敗:", err);
    }
  }, [resultData]);

  const updateData = useCallback(async () => {
    try {
      const bustimeId = bustimeData.bustimeId;
      const endtime = stringTimeToNumber(bustimeData.endTime);

      setPreviousVote(votes.previous);
      setNearestVote(votes.nearest);
      setNextVote(votes.next);

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
  }, [bustimeData, resultData, handlePostAndUpdate]);

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
    default:
      return <BusTimeDisplay previous={previous} nearest={nearest} next={next} previousVote={previousVote} nearestVote={nearestVote} nextVote={nextVote} />;
  }
}