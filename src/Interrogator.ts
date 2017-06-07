import { createInterface, ReadLine } from "readline";
import { Query, Condition } from "./Query";
import { MoodOMeter, MoodEntry, getMoodOMeter } from "./MoodOMeter";
import { writeFile } from "fs";
import { getTodayInMs } from "./MoodOMeter";
import { uploadJsonToGDrive } from "./gdrive/uploadFile";

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
        this.moodOMeter = getMoodOMeter();
        this.entry = this.moodOMeter.getToday().createEntry();
    }

    ask(question: string, validationMessage?: string, condition?: Condition): Promise<Interrogator> {

        function askAgain(interrogator: Interrogator): Promise<Interrogator> {
            const answer = new Promise<Interrogator>((resolve) => {
                interrogator.readLine.question(interrogator.query.validationMessage, (answer) => {
                    interrogator.input = answer;
                    resolve(interrogator);
                });
            });

            return answer
                .then(validateAnswer);
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

        if (condition) {
            return answer
                .then(validateAnswer);
        } else {
            return answer;
        }
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

export function setEntryActivities(interrogator: Interrogator): Interrogator {
    interrogator.entry.activities = interrogator.input.split(", ");
    return interrogator;
}

export function closeReadLine(interrogator: Interrogator): Interrogator {
    interrogator.readLine.close();
    return interrogator;
}

export async function openInterrogation(): Promise<Interrogator> {
    return new Interrogator();
}

export function writeToFile(interrogator: Interrogator): void {
    const versionedFileName = `moodometer${getTodayInMs()}.json`;
    writeFile("data/moodometer.json", JSON.stringify(interrogator.moodOMeter.records));
    writeFile("data/" + versionedFileName, JSON.stringify(interrogator.moodOMeter.records), (err, res) => {
        if (err) {
            console.log("Writing versioned json file failed:", err);
        } else {
            uploadJsonToGDrive(versionedFileName, "data/");
        }
    });
}
