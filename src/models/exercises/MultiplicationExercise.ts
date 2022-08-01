import { IExercise } from '../types';
import { AnswersGenerator } from '../../services/AnswersGenerator';

export abstract class MultiplicationExercise implements IExercise {

  private readonly answers: number[];

  protected constructor(protected firstNumber: number, protected secondNumber: number) {
    this.answers = AnswersGenerator.generate(this.getAnswer(), 4);
  }

  getQuestion(): string {
    return `${this.firstNumber} * ${this.secondNumber} = ?`;
  }

  tryAnswer(answer: string): boolean {
    return parseInt(answer) === this.getAnswer();
  }

  getAvailableAnswers(): number[] {
    return this.answers.slice(0);
  }

  serialize() {
    return {
      name: this.constructor.name,
      args: [this.firstNumber, this.secondNumber],
    };
  }

  protected getAnswer(): number {
    return this.firstNumber * this.secondNumber;
  }
}

