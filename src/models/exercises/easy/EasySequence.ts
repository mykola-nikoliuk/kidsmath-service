import { NewMath } from '../../../services/math';
import { SequenceExercise } from '../SequenceExercise';

export class EasySequence extends SequenceExercise {

  constructor(start: number = NewMath.randBetween(1, 30), shift: number = NewMath.randBetween(2, 10), count = 3, answersCount = 4) {
    super(start, shift, count, answersCount);
  }
}
