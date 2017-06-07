import { Interrogator } from "./Interrogator";

interface IMooDay {
    date: number;
    entries: MoodEntry[];
}

interface IMoodEntry {
    period: number;
    moodRating: number;
    activities: string[];
}

export class MoodOMeter {
    records: MooDay[];
    
    constructor() {
        const rawRecords = require("../data/moodometer.json");
        this.records = [];
        rawRecords.forEach((log) => {
            const mooDay = new MooDay(log.date);
            log.entries.forEach((entry) => {
                const moodEntry = new MoodEntry();
                moodEntry.period = entry.period;
                moodEntry.moodRating = entry.moodRating;
                moodEntry.activities = entry.activities;
                mooDay.entries.push(moodEntry);
            });
            this.records.push(mooDay);
        });
    }
    
    getToday(): MooDay {
        const today = getTodayInMs();
        let result: MooDay;
        for (const record of this.records) {
            if (record.date === today) {
                result = record;
            }
        }
        
        if (result) {
            return result; 
        } else {
            let newLog = new MooDay(today);
            this.records.push(newLog);
            return newLog;
        }
    }
}

export class MooDay implements IMooDay {
    date: number;
    entries: MoodEntry[];

    constructor(date: number) {
        this.date = date;
        this.entries = [];
    }

    createEntry() {
        const entry = new MoodEntry();
        this.entries.push(entry);
        return entry;
    }
}

export class MoodEntry implements IMoodEntry {
    period: number;
    moodRating: number;
    activities: string[];
}


export function getTodayInMs(): number {
    const msInDay = 1000 * 60 * 60 * 24;
    const now = Date.now();
    return now - (now % msInDay);
}

export function getMoodOMeter(): MoodOMeter {
    return new MoodOMeter();
}


