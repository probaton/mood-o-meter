import { getTodayInMs } from "./MoodOMeter";
import { writeFile } from "fs";
import { Interrogator, openInterrogation, closeReadLine, setEntryMoodRating, setEntryPeriod, setEntryActivities } from "./Interrogator";

function writeToFile(interrogator: Interrogator): void {
    writeFile("data/moodometer.json", JSON.stringify(interrogator.moodOMeter.records));
    writeFile(`data/moodometer${getTodayInMs()}.json`, JSON.stringify(interrogator.moodOMeter.records));
}

function isNumberBetween(input: string, lowerLimit: number, upperLimit: number): boolean {
    const numericInput = +input;
    return (!isNaN(numericInput) && numericInput >= lowerLimit && numericInput <= upperLimit);
}

function askPeriod(interrogator) {
    return interrogator.ask(
        "Entry period (1-4 = night-morning)",
        "Submit a valid period",
        (answer) => {
            return isNumberBetween(answer, 1, 4);
        }
    );
}

function askMoodRating(interrogator) {
    return interrogator.ask(
        "Rate your mood (1-10)",
        "Submit a valid mood rating",
        (answer) => {
            return isNumberBetween(answer, 1, 10);
        }
    );
}

function askActivities(interrogator: Interrogator) {
    return interrogator.ask("List what you were doing, separating activities by commas");
}

openInterrogation()
    .then(askPeriod)
    .then(setEntryPeriod)
    .then(askMoodRating)
    .then(setEntryMoodRating)
    .then(askActivities)
    .then(setEntryActivities)
    .then(closeReadLine)
    .then(writeToFile)
    .catch((e) => console.log("Ask chain failed: ", e));
