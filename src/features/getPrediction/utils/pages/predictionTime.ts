import { usePrediction } from "@/src/types/Prediction";
import { getAllUsers } from "../getStayersID/getAllUserData";
import { getStayers } from "../getStayersID/getStayersData";
import { getDayOfWeek } from "../getStayersPrediction/getDayOfWeek";
import { getPredicton } from "../getStayersPrediction/getPrediction";
import { stayerPredictions } from "../getStayersPrediction/stayerFilter";
import { timeSort } from "../recommendedDepartureTime/timeSort";
import { findMaxCountInterval } from "../recommendedDepartureTime/getSection";
import { minDiff } from "../recommendedDepartureTime/minDiff";
import { numberTimeToString } from "../recommendedDepartureTime/numberTimeToString";
import { getAverage } from "../recommendedDepartureTime/weightingAverage";
import { findNearBuses } from "../getBusTimes/findNearBusTimes";


const PredictionTime = async () => {
    const weekDay: number = getDayOfWeek();
    const stayers: number[] = await getStayers();
    const allusers: number[] = await getAllUsers();

    const allPrediction: usePrediction[] = await getPredicton(weekDay, allusers);
    const stayerPrediction: usePrediction[] = stayerPredictions(allPrediction, stayers); //stayerIdで絞り込み
    const sored: number[] = timeSort(stayerPrediction);
    const [start, end, count] = findMaxCountInterval(sored, 30);
    const [members, mindiff] = minDiff(sored, start, end);
    const average = getAverage(members, timeSort(stayerPrediction));
    const { previous, nearest, next } = await findNearBuses(average);
    const previousBus: string = numberTimeToString(previous);
    const nearestsBus = numberTimeToString(nearest);
    const nextBus = numberTimeToString(next);

    return {
        start,
        end,
        mindiff,
        count,
        average,
        previousBus,
        nearestsBus,
        nextBus
    };
}

export default PredictionTime;