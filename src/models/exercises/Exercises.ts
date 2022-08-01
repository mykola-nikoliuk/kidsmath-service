import { IExercise, Newable, SerializedExercise } from '../types';

export class Exercises implements IExercise {

  private exercise: IExercise = this.createExercise();

  constructor(private exerciseClasses: Newable<IExercise>[]) {}

  getQuestion(): string {
    return this.exercise.getQuestion();
  }

  tryAnswer(...args: Parameters<IExercise['tryAnswer']>): boolean {
    return this.exercise.tryAnswer(...args);
  }

  next() {
    this.exercise = this.createExercise();
  }

  getExercise(): IExercise {
    return this.exercise;
  }

  getAvailableAnswers(): ReturnType<IExercise['getAvailableAnswers']> {
    return this.exercise.getAvailableAnswers();
  }

  serialize() {
    return this.exercise.serialize();
  }

  restore(data: SerializedExercise): boolean {
    const Exercise = this.exerciseClasses.find(({ name }) => data.name === name);

    if (Exercise) {
      this.exercise = new Exercise(...data.args);
      return true;
    }

    return false;
  }

  private createExercise(): IExercise {
    const ExerciseClass = this.getRandomExerciseClass();
    return new ExerciseClass();
  }

  private getRandomExerciseClass(): Newable<IExercise> {
    const index = Math.floor(Math.random() * this.exerciseClasses.length);
    return this.exerciseClasses[index];
  }
}
