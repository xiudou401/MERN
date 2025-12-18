import React from 'react';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import { useAuthContext } from '../hooks/useAuthContext';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const handleClick = async () => {
    const res = await fetch(`/api/workouts/${workout._id}`, {
      method: 'delete',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await res.json();

    if (res.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  return (
    <div>
      <h2>{workout.title}</h2>
      <p>{workout.reps}</p>
      <p>{workout.load}</p>
      <p>{workout.createdAt}</p>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
};

export default WorkoutDetails;
