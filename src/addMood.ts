import { Interrogator, openInterrogation, closeReadLine, setEntryMoodRating, setEntryPeriod, setEntryActivities, writeToFile } from "./Interrogator";
import { getDateByReverseIndexFromInput } from "./processInput";

function isNumberBetween(input: string, lowerLimit: number, upperLimit: number): boolean {
    const numericInput = +input;
    return (!isNaN(numericInput) && numericInput >= lowerLimit && numericInput <= upperLimit);
}

function askPeriod(interrogator: Interrogator): Promise<Interrogator> {
    return interrogator.ask(
        "Entry period (1-4 = night-evening)",
        "Submit a valid period",
        (answer) => {
            return isNumberBetween(answer, 1, 4);
        }
    );
}

function askMoodRating(interrogator: Interrogator): Promise<Interrogator> {
    return interrogator.ask(
        "Rate your mood (1-10)",
        "Submit a valid mood rating",
        (answer) => {
            return isNumberBetween(answer, 1, 10);
        }
    );
}

function askActivities(interrogator: Interrogator): Promise<Interrogator> {
    return interrogator.ask("List what you were doing, separating activities by commas");
}

const dateByReverseIndex = getDateByReverseIndexFromInput();

openInterrogation(dateByReverseIndex)
    .then(askPeriod)
    .then(setEntryPeriod)
    .then(askMoodRating)
    .then(setEntryMoodRating)
    .then(askActivities)
    .then(setEntryActivities)
    .then(closeReadLine)
    .then(writeToFile)
    .catch((e) => console.log("Ask chain failed: ", e));
