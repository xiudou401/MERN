import React from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { Workout } from '../types/workout';
import { formatDistanceToNow } from 'date-fns';

interface WorkoutDetailsProps {
  workout: Workout;
}
const WorkoutDetails: React.FC<WorkoutDetailsProps> = ({ workout }) => {
  const { workoutDispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
    if (!user) {
      return;
    }
    const res = await fetch(`/api/workouts/${workout._id}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await res.json();

    if (res.ok) {
      workoutDispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>

      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        Delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
