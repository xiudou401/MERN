import React, { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutContext } from '../hooks/useWorkoutContext';
import WorkoutDetails from '../components/WorkoutDetails';

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/workouts', {
        method: 'get',
        headers: { authorization: `Bearer ${user.token}` },
      });
      const json = await res.json();

      dispatch({ type: 'SET_WORKOUTS', payload: json });
    };

    fetchData();
  }, []);

  return (
    <div>
      {workouts &&
        workouts.map((workout) => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
    </div>
  );
};

export default Home;
