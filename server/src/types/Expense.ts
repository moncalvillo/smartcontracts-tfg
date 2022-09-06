export interface Expense {
    ID: string;
    Amount: number;
    Type: string;
    Concept: string;
    Project: string;
    Owner: string;
    Currency: string;
    Date: Date;
    State: State;
    Resolution: string;
    Inspector: string;
}

type State = "PENDING" | "APPROVED" | "REJECTED";