import { Psylog } from "../typings/Psylog";

function getPsylogs(): Psylog[] {
    return require("../data/psylog");
}

const logs = getPsylogs();
console.log(">>>> logs", logs);
console.log(">>>> log activities", logs[0].activities);
