import "@/src/styles/style.css";
import "@/src/styles/result.css";

type Props = {
    bustime: string;
    member: number | null;
};

export default function ResultDisplay({ bustime, member }: Props) {
    console.log("=== Result ===");
    return (
        <div className="display night">
            {member !== 0 && member != null && (
                <div className="balloon">
                    {member !== 1 ? `${member}人くらいと` : "数人と"} <br />
                    一緒に帰れるかも？
                </div>
            )}
            <div className="result-center-box">
                <div className="time">{bustime}</div>
                <div className="message">のバスに乗りませんか？</div>
            </div>
        </div>
    );
}
