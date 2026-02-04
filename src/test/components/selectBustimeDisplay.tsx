import "../styles/style.css";
import "../styles/select.css";
import { stringTimeToNumber } from "@/src/utils/stringTimeToNumber";
import { numberTimeToString } from "@/src/utils/numberTimeToString";

type Props = {
    previous: string;
    nearest: string;
    next: string;
    previousVote: number;
    nearestVote: number;
    nextVote: number;
};

export default function BusTimeDisplay({
    previous, nearest, next,
    previousVote, nearestVote, nextVote
}: Props) {
    console.log("=== SELECT ===");
    //表示時刻変更
    const numberPrevious = stringTimeToNumber(previous);
    const editPrevious = numberTimeToString(numberPrevious + (8 * 60));

    const numberNearest = stringTimeToNumber(nearest);
    const editNearest = numberTimeToString(numberNearest + (8 * 60));

    const numberNext = stringTimeToNumber(next);
    const editNext = numberTimeToString(numberNext + (8 * 60));


    const renderDots = (count: number) =>
        Array.from({ length: count }).map((_, i) => <span key={i} className="dot" />);

    return (
        <div className={`display night`}>
            <div className="select-center-box">
                <div className="select-time">1. {editPrevious}
                    <div className="vote-dots">{renderDots(previousVote)}</div>
                </div>
                <div className="select-time">2. {editNearest}
                    <div className="vote-dots">{renderDots(nearestVote)}</div>
                </div>
                {next !== "00:00" && (
                    <div className="select-time">3. {editNext}
                        <div className="vote-dots">{renderDots(nextVote)}</div>
                    </div>
                )}
                <div className="message">のバスに乗りませんか？</div>
            </div>
        </div>
    );
}
