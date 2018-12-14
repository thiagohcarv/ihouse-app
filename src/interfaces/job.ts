import { Category } from "./category";
import { UserInterface } from "./user";

export interface Job {
    employerID: string,
    category: Category,
    employee: UserInterface,
    hasAccepted: boolean,
    timestamp: number,
    paid: boolean;
    hasCompleted: boolean;
    urlPhoto: string;
}