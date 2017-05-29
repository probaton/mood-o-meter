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
                const moodEntry = new MoodEntry(entry.period);
                moodEntry.activities = entry.activities;
                moodEntry.moodRating = entry.moodRating;
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

class MooDay implements IMooDay {
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

class MoodEntry implements IMoodEntry {
    period: number;
    moodRating: number;
    activities: string[];

    constructor(period: number) {
        this.period = period;
    }
}


function getTodayInMs(): number {
    const msInDay = 1000 * 60 * 60 * 24;
    const now = Date.now();
    return now - (now % msInDay);
}

export function getMoodOMeter(): MoodOMeter {
    return new MoodOMeter();
}


