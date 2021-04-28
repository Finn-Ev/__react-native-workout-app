import React, { ComponentProps, FC } from 'react';
import { AuthContext, AuthProvider } from './auth.context';
import { PlanProvider } from './plan.context';

const combineComponents = (...components: FC[]): FC => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }: ComponentProps<FC>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    ({ children }) => <>{children}</>
  );
};

const providers = [AuthProvider, PlanProvider];
export const AppContextProvider = combineComponents(...providers);
