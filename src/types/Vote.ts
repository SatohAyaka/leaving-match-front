export type VoteResponse = {
    voteId: number;
    busTimeId: number;
    backendUserId: number;
    previous: boolean;
    nearest: boolean;
    next: boolean;
    createdDate: string;
}