import React, { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const WorkoutForm = () => {
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [error, setError] = useState(null);

  const { user } = useAuthContext();
  const { dispatch } = useWorkoutContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/workouts', {
      method: 'post',
      headers: {
        authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, reps, load }),
    });
    const json = await res.json();
    if (!res.ok) {
      setError(json.error);
    }
    if (res.ok) {
      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
      />
      <label>Reps:</label>
      <input
        type="text"
        onChange={(e) => {
          setReps(e.target.value);
        }}
        value={reps}
      />
      <label>Load:</label>
      <input
        type="text"
        onChange={(e) => {
          setLoad(e.target.value);
        }}
        value={load}
      />
      <button>Add</button>
      <span>{error}</span>
    </form>
  );
};

export default WorkoutForm;
