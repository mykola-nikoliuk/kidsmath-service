import { IExercise } from '../types';

export abstract class MatchExercise implements IExercise {

  private readonly answers: string[];

  protected constructor(protected pairs: [string, string][], private readonly pairIndex: number = Math.floor(Math.random() * pairs.length)) {
    this.answers = this.pairs.map(([, b]) => b);
  }

  getQuestion(): string {
    return `Оберіть пару: ${this.pairs[this.pairIndex][0]}`;
  }

  tryAnswer(answer: string): boolean {
    return answer === this.getAnswer();
  }

  getAvailableAnswers(): string[] {
    return this.answers.slice(0);
  }

  serialize() {
    return {
      name: this.constructor.name,
      args: [this.pairs, this.pairIndex],
    };
  }

  protected getAnswer(): string {
    return this.pairs[this.pairIndex][1];
  }
}

