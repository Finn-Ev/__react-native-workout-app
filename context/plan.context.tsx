import { createContext, useContext, useEffect, useState } from 'react';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PlanContextType = {
  activePlanId: string;
  currentWorkoutIndex: number;
  isLoading: boolean;
  setPlanAsActive: (planId: string) => void;
  increaseCurrentWorkoutIndex: () => void;
  decreaseCurrentWorkoutIndex: () => void;
  resetPlanData: () => void;
};

export const PlanContext = createContext<Partial<PlanContextType>>({});

export const usePlanContext = () => {
  return useContext(PlanContext);
};

export const PlanProvider: React.FC = ({ children }) => {
  const [activePlanId, setActivePlan] = useState('');
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const init = async () => {
    try {
      setIsLoading(true);
      const savedActivePlanId = await AsyncStorage.getItem('@activePlanId');
      if (savedActivePlanId) {
        setActivePlan(savedActivePlanId);
      }
      const savedCurrentWorkoutIndex = await AsyncStorage.getItem(
        '@currentWorkoutIndex'
      );
      if (savedCurrentWorkoutIndex) {
        setCurrentWorkoutIndex(+savedCurrentWorkoutIndex);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    try {
      AsyncStorage.setItem('@activePlanId', activePlanId);
    } catch (error) {
      console.error(error);
    }
  }, [activePlanId]);

  useEffect(() => {
    try {
      if (currentWorkoutIndex !== 0) {
        AsyncStorage.setItem(
          '@currentWorkoutIndex',
          currentWorkoutIndex.toString()
        );
      }
    } catch (error) {
      console.error(error);
    }
  }, [currentWorkoutIndex]);

  const increaseCurrentWorkoutIndex = () => {
    setCurrentWorkoutIndex(currentWorkoutIndex + 1);
  };

  const decreaseCurrentWorkoutIndex = () => {
    setCurrentWorkoutIndex(currentWorkoutIndex - 1);
  };

  const setPlanAsActive = (planId: string) => {
    setActivePlan(planId);
    setCurrentWorkoutIndex(0);
  };

  const resetPlanData = () => {
    setActivePlan('');
    setCurrentWorkoutIndex(0);
    AsyncStorage.clear();
  };

  const values = {
    activePlanId,
    currentWorkoutIndex,
    isLoading,
    setPlanAsActive,
    increaseCurrentWorkoutIndex,
    decreaseCurrentWorkoutIndex,
    resetPlanData,
  };
  return <PlanContext.Provider value={values}>{children}</PlanContext.Provider>;
};
