import { createContext, useContext, useEffect, useState } from 'react';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../data';

type ActivePlanStatsType = {
  id: string;
  workoutIndex: number;
  name: string;
};

type ActiveWorkoutStatsType = {
  name: string;
  progress: {};
  isActive: boolean;
};

type TrainingContextType = {
  activePlanStats: ActivePlanStatsType;
  activeWorkoutStats: ActiveWorkoutStatsType;
  isLoading: boolean;
  startWorkout: () => void;
  finishWorkout: () => void;
  cancelWorkout: () => void;
  startPlan: (planId: string) => void;
  cancelPlan: () => void;
};

export const TrainingContext = createContext<Partial<TrainingContextType>>({});

export const useTrainingContext = () => {
  const context = useContext(TrainingContext);
  if (context === undefined) {
    throw new Error('Use inside a Provider');
  }
  return useContext(TrainingContext);
};

export const PlanProvider: React.FC = ({ children }) => {
  const [activePlanStats, setActivePlanStats] = useState<ActivePlanStatsType>({
    id: '',
    name: '',
    workoutIndex: 0,
  });
  const [
    activeWorkoutStats,
    setActiveWorkoutStats,
  ] = useState<ActiveWorkoutStatsType>({
    isActive: false,
    name: '',
    progress: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);

        const savedActivePlanStats = await AsyncStorage.getItem(
          '@activePlanStats'
        );
        if (savedActivePlanStats) {
          setActivePlanStats(JSON.parse(savedActivePlanStats));
        }

        const savedActiveWorkoutStats = await AsyncStorage.getItem(
          '@activeWorkoutStats'
        );
        if (savedActiveWorkoutStats) {
          setActiveWorkoutStats(JSON.parse(savedActiveWorkoutStats));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    try {
      const { id, workoutIndex } = activePlanStats!;

      const name = data.find(plan => plan.id === id)!.name;

      AsyncStorage.setItem(
        '@activePlanStats',
        JSON.stringify({
          id,
          workoutIndex,
          name,
        })
      );
    } catch (error) {
      console.error(error);
    }
  }, [activePlanStats]);

  useEffect(() => {
    try {
      AsyncStorage.setItem(
        '@activeWorkoutStats',
        JSON.stringify(activeWorkoutStats)
      );
    } catch (error) {
      console.error(error);
    }
  }, [activeWorkoutStats]);

  const startWorkout = () => {
    const { id, workoutIndex } = activePlanStats;

    const { name } = data.find(plan => plan.id === id)!.workouts[workoutIndex];

    setActiveWorkoutStats({ isActive: true, progress: {}, name });
  };

  const finishWorkout = () => {
    setActivePlanStats({
      ...activePlanStats,
      workoutIndex: activePlanStats?.workoutIndex + 1,
    });
    // TODO: Kraftwerte speichern
    setActiveWorkoutStats({ isActive: false, progress: {}, name: '' });
  };

  const cancelWorkout = () => {
    setActiveWorkoutStats({ isActive: false, progress: {}, name: '' });
  };

  const startPlan = (planId: string) => {
    setActivePlanStats({ ...activePlanStats, id: planId });
  };

  const cancelPlan = () => {
    setActivePlanStats({
      name: '',
      id: '',
      workoutIndex: 0,
    });
    AsyncStorage.clear();
  };

  const values = {
    activePlanStats,
    activeWorkoutStats,
    isLoading,
    startWorkout,
    finishWorkout,
    cancelWorkout,
    startPlan,
    cancelPlan,
  };
  return (
    <TrainingContext.Provider value={values}>
      {children}
    </TrainingContext.Provider>
  );
};
