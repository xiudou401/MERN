require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log('database is connected and server is running on port', PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
