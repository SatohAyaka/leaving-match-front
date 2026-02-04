import "../styles/style.css";
import "../styles/result.css";
import { stringTimeToNumber } from "@/src/utils/stringTimeToNumber";
import { numberTimeToString } from "@/src/utils/numberTimeToString";

type Props = {
    bustime: string;
    member: number | null;
};

export default function ResultDisplay({ bustime, member }: Props) {
    console.log("=== Result ===");
    const numberBusTime = stringTimeToNumber(bustime);
    const editBusTime = numberTimeToString(numberBusTime + (8 * 60));
    return (
        <div className="display night">
            {member !== 0 && member != null && (
                <div className="balloon">
                    {member !== 1 ? `${member}人くらいと` : "数人と"} <br />
                    一緒に帰れるかも？
                </div>
            )}
            <div className="result-center-box">
                <div className="time">{editBusTime}</div>
                <div className="message">のバスに乗りませんか？</div>
            </div>
        </div>
    );
}
