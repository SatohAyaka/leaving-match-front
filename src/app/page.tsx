import { getAllUsers } from "../features/getStayersID/getAllUserData";
import { getComingPredictions } from "../features/getStayersID/getComingPredictions";
// import { getComingPredictions } from "../features/getStayersID/getComingPredictions";
import { getStayers } from "../features/getStayersID/getStayersData";
import { getDayOfWeek } from "../features/getStayersPrediction/getDayOfWeek";
import { getPredicton } from "../features/getStayersPrediction/getStayersPrediction";
import { Prediction } from "../types/Prediction";


export default async function Home() {
  const weekDay: number = getDayOfWeek();
  const stayers: number[] = await getStayers();
  const allusers: number[] = await getAllUsers();
  // const users: number[] = await getComingPredictions();
  const comingUser: number[] = await getComingPredictions(weekDay, allusers);

  const allPrediction: Prediction[] = await getPredicton(weekDay, allusers);
  const prediction: Prediction[] = await getPredicton(weekDay, comingUser);
  // if (stayers === null) {
  //   return (
  //     <><main className="p-4 mt-5">
  //       <h1>滞在者がいません</h1>
  //       <hr></hr>
  //       <h3>allUser</h3>
  //       <ul className="space-y-2">
  //         {prediction
  //           .filter((prediction) => prediction.predictionTime != null && prediction.predictionTime != '')//滞在データが足りないものを除く
  //           .map((prediction) => (
  //             <li key={prediction.userId} className="p-4 border rounded">
  //               <p><strong>ID:</strong> {prediction.userId}</p>
  //               <p><strong>予測時刻:</strong>{prediction.predictionTime}</p>
  //             </li>
  //           ))}
  //       </ul>
  //     </main>
  //     </>
  //   )
  // } else {
  const stayerPrediction: Prediction[] = await getPredicton(weekDay, stayers);
  return (
    <><main className="p-4 mt-5">
      <h1 className="text-2xl font-bold mb-4">滞在者情報一覧</h1>
      <h3>AllUser</h3>
      <ul className="space-y-2">
        {allPrediction
          .filter((prediction) => prediction.predictionTime != null && prediction.predictionTime != '')//滞在データが足りないものを除く
          .map((prediction) => (
            <li key={prediction.userId} className="p-4 border rounded">
              <p><strong>ID:</strong> {prediction.userId}</p>
              <p><strong>予測時刻:</strong>{prediction.predictionTime}</p>
            </li>
          ))}
      </ul>
      <hr></hr>
      <h3>stayer</h3>
      <ul className="space-y-2">
        {stayerPrediction
          .filter((stayerPrediction) => stayerPrediction.predictionTime != null && stayerPrediction.predictionTime != '')//滞在データが足りないものを除く
          .map((stayerPrediction) => (
            <li key={stayerPrediction.userId} className="p-4 border rounded">
              <p><strong>ID:</strong> {stayerPrediction.userId}</p>
              <p><strong>予測時刻:</strong>{stayerPrediction.predictionTime}</p>
            </li>
          ))}
      </ul>
      <hr></hr>
      <h3>ComingUser</h3>
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
  // }
}