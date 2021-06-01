import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import data from '../data';

type ActiveWorkoutData = {
  planId: string;
  workoutIndex: number | null;
  name: string;
};

type ActiveWorkoutContextType = {
  activeWorkoutData: ActiveWorkoutData; // basic info about the activeWorkout
  workoutProgress: {};
  startWorkout: (planId: string, workoutIndex: number) => void;
  wipeActiveWorkoutData: () => void;
};

const ActiveWorkoutContext = createContext<Partial<ActiveWorkoutContextType>>(
  {}
);

export const useActiveWorkoutContext = () => {
  return useContext(ActiveWorkoutContext);
};

const ActiveWorkoutProvider: React.FC = ({ children }) => {
  const [
    activeWorkoutData,
    setActiveWorkoutData,
  ] = useState<ActiveWorkoutData>();
  const [workoutProgress, setWorkoutProgress] = useState({});

  useEffect(() => {
    const init = async () => {
      try {
        // setIsLoading(true);
        const savedActiveWorkoutData = await AsyncStorage.getItem(
          '@activeWorkoutData'
        );
        if (savedActiveWorkoutData) {
          setActiveWorkoutData(JSON.parse(savedActiveWorkoutData));
        }
        const savedWorkoutProgress = await AsyncStorage.getItem(
          '@workoutProgress'
        );
        if (savedWorkoutProgress) {
          setWorkoutProgress(JSON.parse(savedWorkoutProgress));
        }
      } catch (error) {
        console.error(error);
      } finally {
        // setIsLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    try {
      if (activeWorkoutData) {
        AsyncStorage.setItem(
          '@activeWorkoutData',
          JSON.stringify(activeWorkoutData)
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, [activeWorkoutData]);

  useEffect(() => {
    try {
      if (workoutProgress) {
        AsyncStorage.setItem(
          '@workoutProgress',
          JSON.stringify(workoutProgress)
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, [workoutProgress]);

  const startWorkout = (planId: string, workoutIndex: number) => {
    if (activeWorkoutData?.planId || activeWorkoutData?.workoutIndex)
      return console.warn('Active Workout is already set');

    const { name } = data.find(plan => plan.id === planId)!.workouts[
      workoutIndex
    ];

    setActiveWorkoutData({ planId, workoutIndex, name });
  };

  const wipeActiveWorkoutData = () => {
    setActiveWorkoutData({ planId: '', workoutIndex: null, name: '' });
  };

  const values = {
    activeWorkoutData,
    workoutProgress,
    startWorkout,
    wipeActiveWorkoutData,
  };
  return (
    <ActiveWorkoutContext.Provider value={values}>
      {children}
    </ActiveWorkoutContext.Provider>
  );
};

export default ActiveWorkoutProvider;
