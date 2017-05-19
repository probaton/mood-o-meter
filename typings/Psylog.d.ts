export interface Psylog {
    date: number;
    interval: DayInterval;
    moodRating: number;
    activities: string[];
}

type DayInterval = "morning" | "afternoon" | "evening" | "night";