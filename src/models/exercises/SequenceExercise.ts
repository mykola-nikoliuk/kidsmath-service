import { IExercise } from '../types';
import { AnswersGenerator } from '../../services/AnswersGenerator';

export abstract class SequenceExercise implements IExercise {

  private readonly answers: number[];
  private readonly sequence: number[];
  private readonly answer: number;

  protected constructor(protected start: number, private shift: number, private count: number, private answersCount = 4) {
    this.sequence = [start];
    let previous = start;
    while (--count > 0) {
      previous += shift;
      this.sequence.push(previous);
    }
    this.answer = previous + shift;
    this.answers = AnswersGenerator.generate(this.getAnswer(), answersCount);
  }

  getQuestion(): string {
    return `Продовжіть послідовність [${[...this.sequence, '?'].join(', ')}]`;
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
      args: [this.start, this.shift, this.count, this.answersCount],
    };
  }

  protected getAnswer(): number {
    return this.answer;
  }
}

