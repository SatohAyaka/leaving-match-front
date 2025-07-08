import { User, UserData } from "@/src/types/Stayer";


export async function getAllUsers(): Promise<UserData[]> {
    const response = await fetch('/api/users');

    if (!response.ok) {
        throw new Error(`ユーザ情報取得失敗: ${response.status}`);
    }

    const usersData: User[] = await response.json();
    const user: UserData[] = usersData
        .filter( //OBのデータを除く
            (user) => user.tags.some(tag => tag.id >= 2 && tag.id <= 8)
        )
        .map(
            (user) => ({
                id: user.id,
                name: user.name
            })
        );
    return user;
}
