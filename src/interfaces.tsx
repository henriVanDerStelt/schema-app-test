export interface Set {
  id: string;
  reps: number;
  weight: number;
  rpe: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: Set[];
}

export interface Day {
  id: string;
  day: number;
  exercises: Exercise[];
}

export interface Week {
  id: string;
  week: number;
  days: Day[];
}
