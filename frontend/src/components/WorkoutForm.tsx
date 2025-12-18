import React, { FormEvent, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutContext } from '../hooks/useWorkoutContext';

const WorkoutForm = () => {
  const [title, setTitle] = useState<string>('');
  const [reps, setReps] = useState<number>(0);
  const [load, setLoad] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const { user } = useAuthContext();
  const { workoutDispatch } = useWorkoutContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      setError('请先登录');
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
      setError(null);
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
        className={emptyFields.includes('title') ? 'error' : ''}
      />
      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => {
          setReps(Number(e.target.value));
        }}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />
      <label>Load:</label>
      <input
        type="number"
        onChange={(e) => {
          setLoad(Number(e.target.value));
        }}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />
      <button>Add</button>
      <span>{error}</span>
    </form>
  );
};

export default WorkoutForm;
