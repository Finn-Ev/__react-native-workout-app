/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Plans: undefined;
  ActiveWorkout: undefined;
};

export type HomeTabParamList = {
  Home: undefined;
  Settings: undefined;
};

export type PlansTabParamList = {
  AllPlans: undefined;
  PlanDetails: undefined;
  Home: undefined;
};

export type ActiveWorkoutTabParamList = {
  ActiveWorkout: undefined;
  Home: undefined;
};

export interface Plan {
  name: string;
  abbreviation: string;
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
