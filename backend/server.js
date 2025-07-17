require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const workoutRoutes = require('./routes/workouts');

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/workouts', workoutRoutes);

app.listen(PORT, () => {
  console.log('server is running on port', PORT);
});
