import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { Workout, WORKOUT_ACTIONS, WorkoutAction } from '../types/workout';

export interface WorkoutState {
  workouts: Workout[];
}

const initialState: WorkoutState = { workouts: [] };
export interface WorkoutContextValue extends WorkoutState {
  workoutDispatch: Dispatch<WorkoutAction>;
}

export const WorkoutContext = createContext<WorkoutContextValue>({
  workouts: [],
  workoutDispatch: (): void => {},
});

export const WorkoutReducer = (
  state: WorkoutState,
  action: WorkoutAction
): WorkoutState => {
  switch (action.type) {
    case WORKOUT_ACTIONS.SET_WORKOUTS:
      return {
        workouts: Array.isArray(action.payload) ? action.payload : [],
      };
    case WORKOUT_ACTIONS.CREATE_WORKOUT:
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case WORKOUT_ACTIONS.DELETE_WORKOUT:
      return {
        workouts: state.workouts.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

interface WorkoutContextProviderProps {
  children: ReactNode;
}

export const WorkoutContextProvider = ({
  children,
}: WorkoutContextProviderProps) => {
  const [state, workoutDispatch] = useReducer(WorkoutReducer, initialState);
  return (
    <WorkoutContext.Provider value={{ ...state, workoutDispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
