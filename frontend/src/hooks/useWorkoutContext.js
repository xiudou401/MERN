import { useContext } from 'react';
import { WorkoutContext } from '../context/WorkoutContext';

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error(
      'useWorkoutContext must be used inside an AuthContextProvider'
    );
  }
  return context;
};
