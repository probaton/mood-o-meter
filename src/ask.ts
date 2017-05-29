import { createInterface, ReadLine } from "readline";

export class LineReader {
    readLine: ReadLine;
    input: string;

    constructor() {
        this.readLine = createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
}

function returnLineReaderInput(lineReader: LineReader): string {
    return lineReader.input;
}

function closeReadLine(lineReader: LineReader): LineReader {
    lineReader.readLine.close();
    return lineReader;
}

async function checkPeriod(lineReader: LineReader) {
    const inputNr = +lineReader.input;
    if (inputNr > 4 || isNaN(inputNr)) {
        return askAgain(lineReader);
    } else {
        return lineReader;
    }
};

export async function askAgain(lineReader: LineReader): Promise<LineReader> {
    const answer = new Promise<LineReader>((resolve) => {
        lineReader.readLine.question("Submit a valid period ", (answer) => {
            lineReader.input = answer;
            resolve(lineReader);
        });
    });

    return answer
        .then(checkPeriod)
        .then(closeReadLine);
};

export async function ask(question: string, lineReader: LineReader): Promise<string> {
    const answer = new Promise<LineReader>((resolve) => {
        lineReader.readLine.question(question, (answer) => {
            let inputNr = +answer;
            if (inputNr > 4 || isNaN(inputNr)) {
                lineReader.input = answer;
                resolve(askAgain(lineReader));
            } else {
                lineReader.input = answer;
                resolve(lineReader);
            }
        });
    });

    return answer
        .then(closeReadLine)
        .then(returnLineReaderInput);
}
