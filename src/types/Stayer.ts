export type Stayer = {
    id: number;
    name: string;
    room: string;
    roomId: number;
    tags: [
        {
            id: number;
            name: string;
        },
    ];
};

export type User = {
    id: number;
    name: string;
    tags: [
        {
            id: number;
            name: string;
        },
    ];
}

export type UserData = {
    id: number;
    name: string;
}