import { useContext } from 'react';
import { WorkoutContext, WorkoutContextValue } from '../context/WorkoutContext';

export const useWorkoutContext = (): WorkoutContextValue => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error(
      'useWorkoutContext must be used inside an WorkContextProvider'
    );
  }
  return context;
};
