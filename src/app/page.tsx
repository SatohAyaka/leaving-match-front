import { getAllUsers } from "../features/getStayersID/getAllUserData";
import { getComingUsers } from "../features/getStayersID/getComingUserData";
// import { getStayers } from "../features/getStayersID/getStayersData";
import { getDayOfWeek } from "../features/getStayersPrediction/getDayOfWeek";
import { getPredicton } from "../features/getStayersPrediction/getStayersPrediction";
import { Prediction } from "../types/Prediction";


export default async function Home() {
  const weekDay: number = getDayOfWeek();
  // const stayers: number[] = await getStayers();
  // const users: number[] = await getAllUsers();
  const users: number[] = await getComingUsers();
  // const prediction: Prediction[] = await getPredicton(weekDay, stayers);
  const prediction: Prediction[] = await getPredicton(weekDay, users);
  return (
    <><main className="p-4 mt-5">
      <h1 className="text-2xl font-bold mb-4">滞在者情報一覧</h1>
      <ul className="space-y-2">
        {prediction
          .filter((prediction) => prediction.predictionTime != null && prediction.predictionTime != '')//滞在データが足りないものを除く
          .map((prediction) => (
            <li key={prediction.userId} className="p-4 border rounded">
              <p><strong>ID:</strong> {prediction.userId}</p>
              <p><strong>予測時刻:</strong>{prediction.predictionTime}</p>
            </li>
          ))}
      </ul>
    </main></>
  );
}
