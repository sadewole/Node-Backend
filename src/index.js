import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import http from 'http';
import authRoute from './routes/authRoute';
import userRoute from './routes/userRoute';
import path from 'path';
import db from './models';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(logger());
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// routes
app.use('/api/v1', authRoute, userRoute);

const server = http.createServer(app);
// server.listen(PORT, () => {
//   console.log('Server running on PORT:', PORT)
// })

// test database
// try {
//   db.sequelize.authenticate()
//   console.log('DB connection has been established successfully.');
// } catch (err) {
//   console.error('Unable to connect to the database:', err);
// }

// sync database
db.sequelize
  .sync()
  .then(() => {
    console.log('DB connection has been established successfully.');
  })
  .then(() => {
    // listen to server
    server.listen(PORT, () => {
      console.log('Server running on PORT:', PORT);
    });
  });
