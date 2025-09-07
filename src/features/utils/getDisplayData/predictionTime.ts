import { usePrediction, userNamePrediction } from "@/src/types/Prediction";
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
import { getSectionMembers } from "../recommendedDepartureTime/getSectionMembers";
import { UserData } from "@/src/types/Stayer";



const PredictionTime = async () => {
    const weekDay: number = getDayOfWeek();
    const stayers: number[] = await getStayers();
    // const allusers: UserData[] = await getAllUsers();

    // const allPrediction: userNamePrediction[] = await getPredicton(weekDay, allusers);
    const stayerPrediction: usePrediction[] = await getPredicton(weekDay, stayers); //stayerIdで絞り込み
    const sored: number[] = timeSort(stayerPrediction);
    const [start, end, count] = findMaxCountInterval(sored, 30);

    const [members, mindiff] = minDiff(sored, start, end);
    const average = getAverage(members, timeSort(stayerPrediction));
    const bustime = await findNearBuses(average);
    const previousBus: string = numberTimeToString(bustime.previousTime);
    const nearestsBus = numberTimeToString(bustime.nearestTime);
    const nextBus = numberTimeToString(bustime.nextTime);
    const member = getSectionMembers(start, end, stayerPrediction);

    return {
        start,
        end,
        mindiff,
        count,
        average,
        previousBus,
        nearestsBus,
        nextBus,
        member,
        // allusers,
    };
}

export default PredictionTime;