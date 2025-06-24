import { User } from "@/src/types/Stayer";


const BASE_URL = process.env.NEXT_PUBLIC_STAY_WATCH_URL;
const GET_USERS = process.env.NEXT_PUBLIC_USERS_API;


export async function getAllUsers(): Promise<number[]> {
    const response = await fetch(`${BASE_URL}${GET_USERS}`);

    if (!response.ok) {
        throw new Error(`ユーザ情報取得失敗: ${response.status}`);
    }

    const usersData: User[] = await response.json();
    const userId: number[] = usersData
        .filter( //OBのデータを除く
            (user) => user.tags.some(tag => tag.id >= 2 && tag.id <= 8)
        )
        .map(
            (user) => user.id
        )
    return userId;
}
