export interface Plan {
  name: string;
  id: string;
  unitsPerWeek: number;
  description: string;
  workouts: Workout[];
}

export type Workout = {
  name: string;
  block: number;
  week: number;
  day: number;
  exercises: Exercise[];
};

export type Exercise = {
  name: string;
  sets: string;
  reps: string;
  '1rm%'?: number | undefined;
  pause?: string | undefined;
  interval?: string | undefined;
  notes?: string | undefined;
};
