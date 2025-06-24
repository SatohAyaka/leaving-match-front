import { getAllUsers } from "../utils/getStayersID/getAllUserData";
// import { getComingPredictions } from "../getStayersID/getComingPredictions";
import { usePrediction } from "../../../types/Prediction";
import { findMaxCountInterval } from "../utils/recommendedDepartureTime/getSection";
import { numberTimeToString } from "../utils/recommendedDepartureTime/numberTimeToString";
import { getDayOfWeek } from "../utils/getStayersPrediction/getDayOfWeek";
import { getPredicton } from "../utils/getStayersPrediction/getPrediction";
import { getStayers } from "../utils/getStayersID/getStayersData";
import { timeSort } from "../utils/recommendedDepartureTime/timeSort";
import { minDiff } from "../utils/recommendedDepartureTime/minDiff";
import { stayerPredictions } from "../utils/getStayersPrediction/stayerFilter";
import { getAverage } from "../utils/recommendedDepartureTime/weightingAverage";
import { findNearBuses } from "../utils/getBusTimes/findNearBusTimes";


export default async function PredictionTimes() {
    const weekDay: number = getDayOfWeek();
    const stayers: number[] = await getStayers();
    const allusers: number[] = await getAllUsers();
    // const comingUser: number[] = await getComingPredictions(weekDay, allusers);

    const allPrediction: usePrediction[] = await getPredicton(weekDay, allusers);
    // const prediction: usePrediction[] = await getPredicton(weekDay, comingUser);
    // const prediction: usePrediction[] = await getPredicton(weekDay, stayers);
    const stayerPrediction: usePrediction[] = stayerPredictions(allPrediction, stayers); //stayerIdで絞り込み
    const sored: number[] = timeSort(stayerPrediction);
    const [start, end, count] = findMaxCountInterval(sored, 30);
    // const [hourstart, hourend, hourcount] = findMaxCountInterval(sored, 60);
    const [members, mindiff] = minDiff(sored, start, end);
    const startTime = numberTimeToString(start);
    const endTime = numberTimeToString(end);
    // const hourStartTime = numberTimeToString(hourstart);
    // const hourEndTime = numberTimeToString(hourend);
    const average = getAverage(members, timeSort(stayerPrediction));
    const { previous, nearest, next } = await findNearBuses(average);
    const previousBus: string = numberTimeToString(previous);
    const nearestsBus = numberTimeToString(nearest);
    const nextBus = numberTimeToString(next);

    // const stayerPrediction: usePrediction[] = await getPredicton(weekDay, stayers);
    return (
        <><main className="p-4 mt-5">
            {/* <h1 className="text-2xl font-bold mb-4">滞在者情報一覧</h1> */}
            {/* <h3>AllUser</h3>
            <ul className="space-y-2">
                {allPrediction
                    .filter((prediction) => prediction.predictionTime != null)//滞在データが足りないものを除く
                    .map((prediction) => (
                        <li key={prediction.userId} className="p-4 border rounded">
                            <p><strong>ID:</strong> {prediction.userId}</p>
                            <p><strong>予測時刻:</strong>{numberTimeToString(prediction.predictionTime)}</p>
                        </li>
                    ))}
            </ul>
            <hr></hr>
            <h3>stayer</h3>
            <ul className="space-y-2">
                {stayerPrediction
                    .filter((stayerPrediction) => stayerPrediction.predictionTime != null)//滞在データが足りないものを除く
                    .map((stayerPrediction) => (
                        <li key={stayerPrediction.userId} className="p-4 border rounded">
                            <p><strong>ID:</strong> {stayerPrediction.userId}</p>
                            <p><strong>予測時刻:</strong>{numberTimeToString(stayerPrediction.predictionTime)}</p>
                        </li>
                    ))}
            </ul>
            <hr></hr> */}
            {/* <h3>ComingUser</h3>
            <ul className="space-y-2">
                {prediction
                    .filter((prediction) => prediction.predictionTime != null)//滞在データが足りないものを除く
                    .map((prediction) => (
                        <li key={prediction.userId} className="p-4 border rounded">
                            <p><strong>ID:</strong> {prediction.userId}</p>
                            <p><strong>予測時刻:</strong>{prediction.predictionTime}</p>
                        </li>
                    ))}
            </ul> */}
            <p>30分区間{startTime}〜{endTime}</p>
            <p>{count}人</p>
            {/* <p>1時間区間{hourStartTime}〜{hourEndTime}</p>
            <p>{hourcount}人</p> */}
            <ul className="space-y-2">
                {members.map((m, i) => (
                    <li key={i}>{
                        numberTimeToString(m)
                    }</li>
                ))}
                <li>{mindiff}分差</li>
            </ul>
            <p>コア点:{numberTimeToString(average)}</p>
            <h3>バス時刻</h3>
            <p>{previousBus}</p>
            <p>{nearestsBus}</p>
            <p>{nextBus}</p>
        </main ></>
    );
    // }
}