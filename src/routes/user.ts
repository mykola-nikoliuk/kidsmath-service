import { Router } from 'express';
import { createAppState } from '../models/AppState';
import { User } from '../models/User';

export const usersRouter = Router();
export const userRouter = Router();

const state = createAppState();

usersRouter.use('/:id', (req, res, next) => {
  const { id } = req.params;

  const userId = parseInt(id);

  if (Number.isInteger(userId)) {
    res.locals.user = state.users.getUserState(userId);
    next();
  } else {
    res.status(404);
    res.end('User does not exist');
  }
}, userRouter);

userRouter.get('/dashboard', (req, res) => {
  const user: User = res.locals.user;
  res.json({
    dashboard: user.getDashboard(),
    answers: user.exercises.getAvailableAnswers(),
  });
});

userRouter.post('/tryAnswer', (req, res) => {
  const user: User = res.locals.user;
  const answer = req.query.answer as string;
  res.json({
    dashboard: user.tryAnswer(answer),
    answers: user.exercises.getAvailableAnswers(),
  });
});

