import { envs } from './envs';
import express from 'express';
import { usersRouter } from './routes/user';

const app = express();

app.use('/users', usersRouter);

app.listen(envs.PORT);
