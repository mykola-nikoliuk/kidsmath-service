import { Exercises } from './exercises/Exercises';
import { easyExercises } from './exercises/easy';
import { ExercisesWithScore } from './exercises/ExercisesWithScore';
import { IBalance } from './Balance';
import { StorageBalance } from './StorageBalance';
import { DailyBalance } from './DailyBalance';
import { messages } from '../messages';
import { UserStorage } from './UserStorage';

export interface IUser {
  exercises: ExercisesWithScore;
  balance: IBalance;
  getDashboard(): string;
  tryAnswer(answer: string): string;
}

export class User implements IUser {
  constructor(public exercises: ExercisesWithScore, public balance: DailyBalance, private userStorage: UserStorage) {
    const { exercise } = userStorage.read();

    if (!exercise || !exercises.restore(exercise)) {
      userStorage.write({ exercise: this.exercises.serialize() });
    }
  }

  getDashboard(): string {
    return [
      `${messages.balance} ${this.balance.getBalance()}\n`,
      `${messages.dailyBalance} ${this.balance.getDailyBalance()}\n`,
      `${this.exercises.getView()}`,
    ].join('');
  }

  tryAnswer(answer: string) {
    const score = this.exercises.tryAnswer(answer);
    const isAnswerCorrect = score >= 0;
    const result = isAnswerCorrect ? messages.correct : messages.incorrect;

    if (isAnswerCorrect) {
      this.exercises.next();
      this.balance.debit(score);
      this.userStorage.write({ exercise: this.exercises.serialize() });
    }

    return `${result}\n\n${this.getDashboard()}`;
  }
}

export class Users {
  getUserState(userId: number) {
    const storageBalance = new StorageBalance(userId);
    const exercises = new Exercises(easyExercises);
    const userStorage = new UserStorage(userId);

    return new User(
      new ExercisesWithScore(exercises),
      new DailyBalance(storageBalance, userId),
      userStorage,
    );
  }
}
