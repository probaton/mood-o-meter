import { Interrogator } from "./Interrogator";

export class Query {
    question: string;
    validationMessage: string;
    condition: Condition;

    constructor(question: string, validationMessage: string, condition: Condition) {
        this.question = question + ": ";
        this.validationMessage = validationMessage + ": ";
        this.condition = condition;
    }
}

export type Condition = (answer: string) => boolean;
