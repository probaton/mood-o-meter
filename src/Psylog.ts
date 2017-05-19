export class Psylog {
    date: number;
    entries: Psyline[];
}

export class Psyline {
    period: number;
    moodRating: number; 
    activities: string[];   
}
