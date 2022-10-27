import User from "../models/User";

export interface Expense {
    ID: string;
    Amount: number;
    Type: string;
    Concept: string;
    Project: string;
    Owner: User;
    Currency: string;
    State: State;
    Resolution: string;
    Inspector: User;
    createdAt: Date;
    updatedAt?: Date;
    resolvedAt?:Date;
}

type State = "PENDING" | "APPROVED" | "REJECTED";