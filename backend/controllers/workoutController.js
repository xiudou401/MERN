const Workout = require('../models/workoutModel');

const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  try {
    const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findById(id);
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  const user_id = req.user._id;

  const emptyFields = [];

  if (!title) {
    emptyFields.push('title');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (!load) {
    emptyFields.push('load');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  try {
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const putWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  try {
    const workout = await Workout.findByIdAndDelete({ _id: id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  postWorkout,
  putWorkout,
  deleteWorkout,
};
