interface IMooDay {
    date: number;
    entries: MoodEntry[];
}

interface IMoodEntry {
    period: number;
    moodRating: number;
    activities: string[];
}

export class MooDay implements IMooDay {
    date: number;
    entries: MoodEntry[];

    constructor(date: number) {
        this.date = date;
        this.entries = [];
    }

    createEntry(period: number) {
        this.entries.push(new MoodEntry(period));
    }
}

export class MoodEntry implements IMoodEntry {
    period: number;
    moodRating: number;
    activities: string[];

    constructor(period: number) {
        this.period = period;
    }
}

export function parseMoodOMeter(): MooDay[] {
    const logs: IMooDay[] = require("../data/psylog");
    const result: MooDay[] = [];
    logs.forEach((log) => {
        const mooDay = new MooDay(log.date);
        log.entries.forEach((entry) => {
            const moodEntry = new MoodEntry(entry.period);
            moodEntry.activities = entry.activities;
            moodEntry.moodRating = entry.moodRating;
            mooDay.entries.push(moodEntry);
        });
        result.push(mooDay);
    });
    return result;
}


function getTodayInMs(): number {
    const msInDay = 1000 * 60 * 60 * 24;
    const now = Date.now();
    return now - (now % msInDay);
}

export function getMooDayForToday(logs: MooDay[]): MooDay {
    const today = getTodayInMs();
    let result: MooDay;
    for (const log of logs) {
        if (log.date === today) {
            console.log(">>>> log exists");
            result = log;
        }
    }

    console.log(">>>> log not exists");
    let newLog = new MooDay(today);
    return newLog;
}
