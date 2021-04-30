import React, { ComponentProps, FC } from 'react';
import ActiveWorkoutProvider from './activeWorkout.context';
import { AuthProvider } from './auth.context';
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

const providers = [AuthProvider, PlanProvider, ActiveWorkoutProvider];
export const AppContextProvider = combineComponents(...providers);

// export function createStrictContext<T>(
//   options: {
//     errorMessage?: string;
//     name?: string;
//   } = {}
// ) {
//   const Context = React.createContext<T | undefined>(undefined);
//   Context.displayName = options.name; // for DevTools

//   function useContext() {
//     const context = React.useContext(Context);
//     if (context === undefined) {
//       throw new Error(
//         options.errorMessage || `${options.name || ''} Context Provider is missing`
//       );
//     }
//     return context;
//   }

//   return [Context.Provider, useContext] as [React.Provider<T>, () => T];
// }
