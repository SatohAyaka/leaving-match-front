
import { useRouter } from "next/router";
import { useState } from "react";
import { UserData } from "../types/Stayer";
import { Select } from "@mantine/core";

type BusTimeFormProps = {
    previous: string;
    nearest: string;
    next: string;
    allUsers: UserData[];
};

export default function BusTimeForm({ previous, nearest, next, allUsers }: BusTimeFormProps) {
    const [userId, setUserId] = useState<string | null>(null);
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
                    <label htmlFor="userId">ユーザー：</label>
                    <Select
                        id="userId"
                        value={userId}
                        placeholder="ユーザーを選択"
                        searchable
                        onChange={(data) => setUserId(data)}
                        data={
                            allUsers?.map((user) => ({
                                value: user.id.toString(),
                                label: user.name,
                            })) ?? [] // ← fallbackとして空配列
                        }
                        nothingFoundMessage="ユーザーが見つかりません"
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
