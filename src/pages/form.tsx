
import { useRouter } from "next/router";
import { useState } from "react";

type BusTimeFormProps = {
    previous: string;
    nearest: string;
    next: string;
};

export default function BusTimeForm({ previous, nearest, next }: BusTimeFormProps) {
    const [userId, setUserId] = useState("");
    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
    const [usersSelection, setUsersSelection] = useState<{ [userId: string]: string[] }>({});

    const busTimes = [previous, nearest, next];
    const handleCheckboxChange = (time: string, checked: boolean) => {
        setSelectedTimes((prev) =>
            checked ? [...prev, time] : prev.filter((t) => t !== time)
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedTimes.length === 0 || !userId) return;

        setUsersSelection((userSelection) => ({
            ...userSelection,
            [userId]: selectedTimes,
        }));

        // フォームをクリア（任意）
        setUserId("");
        setSelectedTimes([]);
    };

    const counts: { [time: string]: number } = {};
    Object.values(usersSelection).forEach((selections) => {
        selections.forEach((time) => {
            counts[time] = (counts[time] || 0) + 1;
        });
    });

    const router = useRouter();

    const handleResult = () => {
        if (Object.keys(counts).length === 0) {
            alert("投票されませんでした");
            return;
        }

        const maxCount = Math.max(...Object.values(counts));
        const winner = busTimes.find((time) => counts[time] === maxCount);

        if (winner) {
            router.push(`/result?time=${encodeURIComponent(winner)}`);
        } else {
            router.push(`/home`);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="userId">ユーザーID：</label>
                    <input
                        type="text"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <p>バス時刻を選択（複数可）：</p>
                    {busTimes.map((time) => (
                        <label key={time} style={{ display: "block", marginBottom: "0.5em" }}>
                            <input
                                type="checkbox"
                                value={time}
                                checked={selectedTimes.includes(time)}
                                onChange={(e) => handleCheckboxChange(time, e.target.checked)}
                            />
                            {time}
                        </label>
                    ))}
                </div>

                <button type="submit">送信</button>
                <hr></hr>
                <div>
                    <h4>投票数</h4>
                    <ul>
                        {busTimes.map((time) => (
                            <li key={time}>
                                {time}：{counts[time] || 0}回
                            </li>
                        ))}
                    </ul>
                </div>
            </form>
            <button type="button" onClick={handleResult}>
                判定
            </button>
        </>
    );
}
