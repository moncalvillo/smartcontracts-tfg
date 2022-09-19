import User from "../models/User";

export interface Expense {
    ID: string;
    Amount: number;
    Type: string;
    Concept: string;
    Project: string;
    Owner: User;
    Currency: string;
    Date: Date;
    State: State;
    Resolution: string;
    Inspector: User;
}

type State = "PENDING" | "APPROVED" | "REJECTED";