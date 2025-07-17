const express = require('express');
const router = express.Router();

const {
  getWorkouts,
  getWorkout,
  postWorkout,
  putWorkout,
  deleteWorkout,
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

router.get('/', getWorkouts);
router.get('/:id', getWorkout);
router.post('/', postWorkout);
router.put('/:id', putWorkout);
router.delete('/:id', deleteWorkout);

module.exports = router;
