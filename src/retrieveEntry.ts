import { getDateByReverseIndexFromInput } from "./processInput";
import { MoodOMeter } from "./MoodOMeter";
import { getDateInMs } from "./Interrogator";

const dateByReverseIndex = getDateByReverseIndexFromInput();
const dateInMs = getDateInMs(dateByReverseIndex);
const day = new MoodOMeter().retrieveDay(dateInMs);

if (day) {
    console.log("Date (ms): ", day.date);
    console.log("Entries: ");
    const sortedEntries = day.entries.sort((a, b) => { return a.period - b.period } );
    sortedEntries.forEach((entry) => {
        console.log("   Period: ", entry.period);
        console.log("       Rating: ", entry.moodRating);
        console.log("       Activities: ", entry.activities);
    });
} else {
    console.log("No log was found for the requested date");
}