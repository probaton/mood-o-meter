import { MoodOMeter, getMoodOMeter } from "./MoodOMeter";
import { writeFile } from "fs";
import { openInterrogation, closeReadLine, setEntryMoodRating, setEntryPeriod, addEntryActivity } from "./Interrogator";

function writeToFile(period: number): void {
    const moodOMeter = getMoodOMeter();
    const today = moodOMeter.getToday();
    today.createEntry();

    writeFile("data/moodometer.json", JSON.stringify(moodOMeter.records));
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

openInterrogation()
    .then(askPeriod)
    .then(setEntryPeriod)
    .then(askMoodRating)
    .then(setEntryMoodRating)
    .then(closeReadLine)
    .then((interrogator) => { console.log(">>>> entry", interrogator.entry); })
    .catch((e) => console.log("Ask chain failed: ", e));
