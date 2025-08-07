require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

const workoutRoute = require('./routes/workoutRoute');
const userRoute = require('./routes/userRoute');


app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


app.use('/api/workouts', workoutRoute);
app.use('/api/user', userRoute);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        'database is connected and server is running on port',
        process.env.PORT
      );
    });
  })
  .catch((error) => console.log(error));
