export interface Workout {
  _id: string;
  title: string;
  reps: number;
  load: number;
  createdAt: string;
}

export const WORKOUT_ACTIONS = {
  SET_WORKOUTS: 'SET_WORKOUTS',
  CREATE_WORKOUT: 'CREATE_WORKOUT',
  DELETE_WORKOUT: 'DELETE_WORKOUT',
} as const;

export type WorkoutAction =
  | { type: typeof WORKOUT_ACTIONS.SET_WORKOUTS; payload: Workout[] }
  | { type: typeof WORKOUT_ACTIONS.CREATE_WORKOUT; payload: Workout }
  | { type: typeof WORKOUT_ACTIONS.DELETE_WORKOUT; payload: Workout };
