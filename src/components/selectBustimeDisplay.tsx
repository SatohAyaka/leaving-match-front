import "../styles/result.css";
type Props = {
    previous: string | null;
    nearest: string | null;
    next: string | null;
    previousVote: number;
    nearestVote: number;
    nextVote: number;
};

export default function BusTimeDisplay({
    previous, nearest, next,
    previousVote, nearestVote, nextVote
}: Props) {
    const renderDots = (count: number) =>
        Array.from({ length: count }).map((_, i) => <span key={i} className="dot" />);

    return (
        <div className={`display night`}>
            <div className="center-box">
                <div className="time">{previous}
                    <div className="vote-dots">{renderDots(previousVote)}</div>
                </div>
                <div className="time">{nearest}
                    <div className="vote-dots">{renderDots(nearestVote)}</div>
                </div>
                <div className="time">{next}
                    <div className="vote-dots">{renderDots(nextVote)}</div>
                </div>
                <div className="message">のバスに乗りませんか？</div>
            </div>
        </div>
    );
}
