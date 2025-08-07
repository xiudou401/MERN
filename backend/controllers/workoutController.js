const Workout = require('../models/workoutModel');

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ error: json.error });
  }
};
const getWorkout = async (req, res) => {};

const postWorkout = async (req, res) => {};
const putWorkout = async (req, res) => {};
const deleteWorkout = async (req, res) => {};

module.exports = {
  getWorkouts,
  getWorkout,
  postWorkout,
  putWorkout,
  deleteWorkout,
};
