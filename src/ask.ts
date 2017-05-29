import { createInterface, ReadLine } from "readline";

export class Interrogator {
    question: string;
    validationMessage: string;
    condition: Condition;
    readLine: ReadLine;
    input: string;

    constructor(question: string, condition: Condition, validationMessage: string) {
        this.question = question;
        this.validationMessage = validationMessage;
        this.condition = condition;
        this.readLine = createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
}

function validateAnswer(interrogator: Interrogator) {
    if (interrogator.condition(interrogator.input)) {
        return askAgain(interrogator);
    } else {
        return interrogator;
    }
}

async function askAgain(interrogator: Interrogator): Promise < Interrogator > {
    const answer = new Promise<Interrogator>((resolve) => {
        interrogator.readLine.question(interrogator.validationMessage, (answer) => {
            interrogator.input = answer;
            resolve(interrogator);
        });
    });

    return answer
        .then(validateAnswer)
};

export async function ask(interrogator: Interrogator): Promise < string > {
    const answer = new Promise<Interrogator>((resolve) => {
        interrogator.readLine.question(interrogator.question, (answer) => {
            interrogator.input = answer;
            resolve(interrogator);
        });
    });

    return answer
        .then(validateAnswer)
        .then(closeReadLine)
        .then(returnLineReaderInput);
}

function returnLineReaderInput(interrogator: Interrogator): string {
    return interrogator.input;
}

function closeReadLine(interrogator: Interrogator): Interrogator {
    interrogator.readLine.close();
    return interrogator;
}

export type Condition = (answer: string) => boolean;
