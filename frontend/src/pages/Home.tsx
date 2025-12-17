import React, { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

const Home = () => {
  const { workouts, workoutDispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const res = await fetch('/api/workouts', {
        method: 'get',
        headers: { authorization: `Bearer ${user.token}` },
      });
      const json = await res.json();

      workoutDispatch({ type: 'SET_WORKOUTS', payload: json });
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>

      <WorkoutForm />
    </div>
  );
};

export default Home;
