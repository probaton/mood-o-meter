import { createInterface, ReadLine } from "readline";
import { Query, Condition } from "./Query";
import { MoodOMeter, MoodEntry, getMoodOMeter } from "./MoodOMeter";

export class Interrogator {
    query: Query;
    moodOMeter: MoodOMeter;
    entry: MoodEntry;
    readLine: ReadLine;
    input: string;

    constructor() {
        this.readLine = createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    ask(question: string, validationMessage: string, condition: Condition): Promise<Interrogator> {

        function askAgain(interrogator: Interrogator): Promise<Interrogator> {
            const answer = new Promise<Interrogator>((resolve) => {
                interrogator.readLine.question(interrogator.query.validationMessage, (answer) => {
                    interrogator.input = answer;
                    resolve(interrogator);
                });
            });

            return answer
                .then(validateAnswer)
        };

        function validateAnswer(interrogator: Interrogator) {
            if (interrogator.query.condition(interrogator.input)) {
                return interrogator;
            } else {
                return askAgain(interrogator);
            }
        }

        const query = new Promise<Query>((resolve) => {
            resolve(new Query(question, validationMessage, condition));
        })

        const answer = query
            .then((query) => {
                this.query = query;
                return this;
            })
            .then((interrogator) => {
                return new Promise<Interrogator>((resolve) => {
                this.readLine.question(interrogator.query.question, (answer) => {
                    this.input = answer;
                    resolve(this);
                });
            });
        });

        return answer
            .then(validateAnswer);
    }
}

export function setEntryPeriod(interrogator: Interrogator): Interrogator {
    interrogator.entry.period = +interrogator.input;
    return interrogator;
}

export function setEntryMoodRating(interrogator: Interrogator): Interrogator {
    interrogator.entry.moodRating = +interrogator.input;
    return interrogator;
}

export function addEntryActivity(interrogator: Interrogator): Interrogator {
    interrogator.entry.activities.push(interrogator.input);
    return interrogator;
}

export function getEntry(interrogator: Interrogator) {
    interrogator.moodOMeter = getMoodOMeter();
    interrogator.entry = interrogator.moodOMeter.getToday().createEntry();
    return interrogator;
}

export function closeReadLine(interrogator: Interrogator): Interrogator {
    interrogator.readLine.close();
    return interrogator;
}

export async function openInterrogation(): Promise<Interrogator> {
    return new Interrogator();
}
