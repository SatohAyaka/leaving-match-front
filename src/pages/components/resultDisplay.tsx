type Props = {
    bustime: string;
    member: number | null;
};

export default function ResultDisplay({ bustime, member }: Props) {
    return (
        <div className="display night">
            {member !== 0 && (
                <div className="balloon">
                    {member !== null ? `${member}人くらいと` : "数人と"} <br />
                    一緒に帰れるかも？
                </div>
            )}
            <div className="center-box">
                <div className="time">{bustime}</div>
                <div className="message">のバスに乗りませんか？</div>
            </div>
        </div>
    );
}
