import { MatchExercise } from '../MatchExercise';

const Directions = {
  north: { symbol: '↑', name: 'North / Північ' },
  south: {symbol: '↓', name: 'South / Південь' },
  west: {symbol: '←', name: 'West / Захід' },
  east: {symbol: '→', name: 'East / Схід' },
};

const directionPairs: [string, string][] = [
  [Directions.north.name, Directions.north.symbol],
  [Directions.south.name, Directions.south.symbol],
  [Directions.west.name, Directions.west.symbol],
  [Directions.east.name, Directions.east.symbol]
];
const reversedDirectionPairs: [string, string][] = directionPairs.map(([a, b]) => [b, a]);

const pairsSets = [
  directionPairs,
  reversedDirectionPairs,
]

export class EasyDirection extends MatchExercise {
  constructor(pairs: [string, string][] = pairsSets[Math.floor(Math.random() * pairsSets.length)], pairIndex?: number) {
    super(pairs.slice(0), pairIndex);
  }
}
