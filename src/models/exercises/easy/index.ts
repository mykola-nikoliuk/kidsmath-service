import { EasySumUsingWords } from './EasySumUsingWords';
import { EasyMultiplication } from './EasyMultiplication';
import { MediumSum } from '../medium/MediumSum';
import { MediumSub } from '../medium/MediumSub';
import { EasySequence } from './EasySequence';
import { EasyDirection } from './EasyDirection';
import { IExercise, Newable } from '../../types';

export const easyExercises: Newable<IExercise>[] = [EasySequence, EasyDirection, MediumSum, MediumSub, EasySumUsingWords, EasyMultiplication];
