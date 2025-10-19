export type VoteResponse = {
    VoteId: number;
    BusTimeId: number;
    BackendUserId: number;
    Previous: boolean;
    Nearest: boolean;
    Next: boolean;
    CreatedDate: string;
}

export type Vote = {
    previous: number;
    nearest: number;
    next: number;
}