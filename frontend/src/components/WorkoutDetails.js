import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutDetails = ({ _id, title, reps, load, createdAt }) => {
  const handleClick = async () => {};
  return (
    <div className="workout-details">
      <h4>{title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {load}
      </p>
      <p>
        <strong>Reps: </strong>
        {reps}
      </p>
      <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
