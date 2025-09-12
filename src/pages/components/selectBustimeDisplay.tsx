type Props = {
    previous: string | null;
    nearest: string | null;
    next: string | null;
};

export default function BusTimeDisplay({ previous, nearest, next }: Props) {
    return (
        <div className={`display night`}>
            <div className="center-box">
                <div className="time">{previous}</div>
                <div className="time">{nearest}</div>
                <div className="time">{next}</div>
                <div className="message">のバスに乗りませんか？</div>
            </div>
        </div>
    );
}
