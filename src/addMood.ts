import { MoodOMeter, getMoodOMeter } from "./MoodOMeter";
import { writeFile } from "fs";
import { Interrogator, ask } from "./ask";

function writeToFile(period: number): void {
    const moodOMeter = getMoodOMeter();
    const today = moodOMeter.getToday();
    today.createEntry(period);
    
    writeFile("data/moodometer.json", JSON.stringify(moodOMeter.records));
}

function stringToNumber(string: string) { return +string }

function checkPeriod(answer): boolean {
    const numericAnswer = +answer;
    return (isNaN(numericAnswer) || numericAnswer > 4);
};

const interrogator = new Interrogator("Entry period (1-4 = night-morning) ", checkPeriod, "Submit a valid period ");

ask(interrogator)
    .then(stringToNumber)
    .then(writeToFile)
    .then(getMoodOMeter)
    .then((mooDays) => { console.log(">>>> read again", mooDays); })
    .catch((e) => console.log("Ask chain failed: ", e));
