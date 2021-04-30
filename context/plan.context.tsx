import { createContext, useContext, useEffect, useState } from 'react';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import data from '../data';

type PlanContextType = {
  activePlanId: string;
  currentWorkoutIndex: number;
  isLoading: boolean;
  activePlanName: string;
  setPlanAsActive: (planId: string) => void;
  incrementCurrentWorkoutIndex: () => void;
  finishWorkout: () => void;
  resetPlanData: () => void;
};

export const PlanContext = createContext<Partial<PlanContextType>>({});

export const usePlanContext = () => {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('Use inside a Provider');
  }
  return useContext(PlanContext);
};

export const PlanProvider: React.FC = ({ children }) => {
  const [activePlanId, setActivePlan] = useState('');
  const [activePlanName, setActivePlanName] = useState('');
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
      AsyncStorage.setItem('@activePlanId', activePlanId).then(() => {
        if (activePlanId) {
          const { name } = data.find(plan => plan.id === activePlanId)!;
          setActivePlanName(name);
        }
      });
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

  const incrementCurrentWorkoutIndex = () => {
    setCurrentWorkoutIndex(currentWorkoutIndex + 1);
  };

  const finishWorkout = () => {
    setCurrentWorkoutIndex(currentWorkoutIndex + 1);
  };

  // const decreaseCurrentWorkoutIndex = () => {
  //   setCurrentWorkoutIndex(currentWorkoutIndex - 1);
  // };

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
    activePlanName,
    currentWorkoutIndex,
    isLoading,
    setPlanAsActive,
    incrementCurrentWorkoutIndex,
    finishWorkout,
    resetPlanData,
  };
  return <PlanContext.Provider value={values}>{children}</PlanContext.Provider>;
};
