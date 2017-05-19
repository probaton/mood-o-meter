import { Psylog, Psyline } from "./Psylog";
import { writeFile } from "fs";
import { createInterface, ReadLine } from "readline";


function getTodayInMs(): number {
    const msInDay = 1000 * 60 * 60 * 24;
    const now = Date.now();
    return now - (now % msInDay);
}

function getPsylogForToday(logs: Psylog[]): Psylog {
    const today = getTodayInMs();
    for (const log of logs) {
        if (log.date === today) { return log; }
    }
    let newLog = new Psylog();
    newLog.date = today;
    return newLog;
}

function checkPeriodInput(periodInput: any, readLine: ReadLine): number {
    const inputNr = +periodInput;
    console.log(periodInput.length);
    if (periodInput.length > 1 || inputNr > 4 || isNaN(inputNr)) {
        readLine.question("Please to submit valid period ", (input) => {
            checkPeriodInput(input, readLine);
        });
    } else {
        readLine.close();
        return inputNr;
    }
}

const logs: Psylog[] = require("../data/psylog");
let logForToday = getPsylogForToday(logs);
let logLine = new Psyline();

const readLine = createInterface({
    input: process.stdin,
    output: process.stdout
})

readLine.question("Entry period (1-4 = night-morning) ", (input) => {
    const period = checkPeriodInput(input, readLine);
    logLine.period = period;
});

console.log(logLine.period);
logForToday.entries.push(logLine);
writeFile("data/psylog.json", JSON.stringify(logs));