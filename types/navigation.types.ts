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
  PlanDetails: { planId: string };
  Home: undefined;
};

export type ActiveWorkoutTabParamList = {
  ActiveWorkout: undefined;
  Home: undefined;
};
