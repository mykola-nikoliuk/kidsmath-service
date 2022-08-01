import { Serializable } from 'node:child_process';

export interface Newable<T = any> {
  new(...args: any): T;
}

export interface SerializedExercise {
  name: string;
  args: Serializable[];
}

export interface IExercise {
  getQuestion(): string;
  tryAnswer(answer: string): boolean;
  serialize(): SerializedExercise;
  getAvailableAnswers(): number[] | string[];
}
