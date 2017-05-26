import { MooDay, MoodEntry, parseMoodOMeter, getMooDayForToday } from "./Psylog";
import { writeFile } from "fs";
import { LineReader, ask, askAgain } from "./ask";

function writeToFile(period: number): void {
    const logs: MooDay[] = parseMoodOMeter();
    console.log(">>>> the logs", logs);
    const log = getMooDayForToday(logs);
    console.log(">>>> entries before", log.entries);
    log.createEntry(period);
    console.log(">>>> entries after", log.entries);
    writeFile("data/psylog.json", JSON.stringify(logs));
}

function stringToNumber(string: string) { return +string }


ask("Entry period (1-4 = night-morning) ", new LineReader())
    .then((answer) => {
        console.log(">>>> answer", answer);
        return answer;
    })
    .then(stringToNumber)
    .then(writeToFile)
    .catch((e) => console.log("Ask chain failed: ", e));
