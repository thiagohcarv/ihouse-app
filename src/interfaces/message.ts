import { UserInterface } from "./user";
import { Job } from "./job";

export interface Message {
    user: UserInterface,
    title: string,
    body: string,
    job?: Job,
    visualized: boolean
}
