import React, { ChangeEvent, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const WorkoutForm = () => {
  const [title, setTitle] = useState<string>('');
  const [reps, setReps] = useState<string>('');
  const [load, setLoad] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const { user } = useAuthContext();
  const { workoutDispatch } = useWorkoutContext();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      setError('Not authenticated');
      return;
    }
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
      setEmptyFields(json.emptyFields);
    }
    if (res.ok) {
      workoutDispatch({ type: 'CREATE_WORKOUT', payload: json });
      setEmptyFields([]);
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label>Excersize Title:</label>
      <input
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />
      <label>Reps:</label>
      <input
        type="text"
        onChange={(e) => {
          setReps(e.target.value);
        }}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />
      <label>Load:</label>
      <input
        type="text"
        onChange={(e) => {
          setLoad(e.target.value);
        }}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />
      <button>Add</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
