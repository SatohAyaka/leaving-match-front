import "../styles/style.css";
import "../styles/select.css";

type Props = {
    previous: string | undefined;
    nearest: string | undefined;
    next: string | undefined;
    previousVote: number;
    nearestVote: number;
    nextVote: number;
};

export default function BusTimeDisplay({
    previous, nearest, next,
    previousVote, nearestVote, nextVote
}: Props) {
    console.log("=== SELECT ===");
    const renderDots = (count: number) =>
        Array.from({ length: count }).map((_, i) => <span key={i} className="dot" />);

    return (
        <div className={`display night`}>
            <div className="select-center-box">
                <div className="select-time">1. {previous}
                    <div className="vote-dots">{renderDots(previousVote)}</div>
                </div>
                <div className="select-time">2. {nearest}
                    <div className="vote-dots">{renderDots(nearestVote)}</div>
                </div>
                {next !== "00:00" && (
                    <div className="select-time">3. {next}
                        <div className="vote-dots">{renderDots(nextVote)}</div>
                    </div>
                )}
                <div className="message">のバスに乗りませんか？</div>
            </div>
        </div>
    );
}
