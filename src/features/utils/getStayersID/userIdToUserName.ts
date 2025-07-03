import { UserData } from "@/src/types/Stayer";

export default function userIdToName(userData: UserData[], userId: number): string {
    const user = userData.find((user) => user.id === userId);
    return user ? user.name : "存在しないユーザーです"
}