import { createContext, useContext, useState } from 'react';
import React from 'react';

type PlanContextType = {
  activePlanId: string;
  currentWorkoutIndex: number;
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
  };

  const values = {
    activePlanId,
    currentWorkoutIndex,
    setPlanAsActive,
    increaseCurrentWorkoutIndex,
    decreaseCurrentWorkoutIndex,
    resetPlanData,
  };
  return <PlanContext.Provider value={values}>{children}</PlanContext.Provider>;
};
