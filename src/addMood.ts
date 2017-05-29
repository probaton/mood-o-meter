import { MoodOMeter, getMoodOMeter } from "./MoodOMeter";
import { writeFile } from "fs";
import { LineReader, ask, askAgain } from "./ask";

function writeToFile(period: number): void {
    const moodOMeter = getMoodOMeter();
    const today = moodOMeter.getToday();
    today.createEntry(period);
    
    writeFile("data/moodometer.json", JSON.stringify(moodOMeter.records));
}

function stringToNumber(string: string) { return +string }


ask("Entry period (1-4 = night-morning) ", new LineReader())
    .then(stringToNumber)
    .then(writeToFile)
    .then(getMoodOMeter)
    .then((mooDays) => { console.log(">>>> read again", mooDays); })
    .catch((e) => console.log("Ask chain failed: ", e));
