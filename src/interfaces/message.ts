import { UserInterface } from "./user";
import { Job } from "./job";

export interface Message {
    id: number,
    user: UserInterface,
    title: string,
    body: string,
    job?: Job
}
