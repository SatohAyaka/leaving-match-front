export type VoteResponse = {
    voteId: number;
    busTimeId: number;
    backendUserId: number;
    previous: boolean;
    nearest: boolean;
    next: boolean;
    createdDate: string;
}

export type Vote = {
    previous: number;
    nearest: number;
    next: number;
}