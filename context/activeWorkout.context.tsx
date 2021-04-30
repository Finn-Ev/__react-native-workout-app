import { useNavigation } from '@react-navigation/native';
import React, { createContext, useContext, useState } from 'react';
import data from '../data';

type ActiveWorkoutData = {
  planId: string;
  workoutIndex: number | null;
  name: string;
};

type ActiveWorkoutContextType = {
  activeWorkoutData: ActiveWorkoutData;
  progress: {};
  startWorkout: (planId: string, workoutIndex: number) => void;
  wipeActiveWorkout: () => void;
};

const ActiveWorkoutContext = createContext<Partial<ActiveWorkoutContextType>>(
  {}
);

export const useActiveWorkoutContext = () => {
  return useContext(ActiveWorkoutContext);
};

const ActiveWorkoutProvider: React.FC = ({ children }) => {
  const [activeWorkout, setActiveWorkout] = useState<ActiveWorkoutData>();
  const [workoutProgress, setWorkoutProgress] = useState({});

  const startWorkout = (planId: string, workoutIndex: number) => {
    if (activeWorkout?.planId || activeWorkout?.workoutIndex)
      return console.warn('Active Workout is already set');

    const { name } = data.find(plan => plan.id === planId)!.workouts[
      workoutIndex
    ];

    setActiveWorkout({ planId, workoutIndex, name });
  };

  const wipeActiveWorkout = () => {
    setActiveWorkout({ planId: '', workoutIndex: null, name: '' });
  };

  const values = {
    activeWorkoutData: activeWorkout,
    progress: workoutProgress,
    startWorkout,
    wipeActiveWorkout,
  };
  return (
    <ActiveWorkoutContext.Provider value={values}>
      {children}
    </ActiveWorkoutContext.Provider>
  );
};

export default ActiveWorkoutProvider;
