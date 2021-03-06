import week1 from './block1/week1';
import week2 from './block1/week2';
import week3 from './block1/week3';
import week4 from './block1/week4';
import week5_deload from './block1/week5_deload';
import week6 from './block2/week6';
import week7 from './block2/week7';
import week8 from './block2/week8';
import week9 from './block2/week9';
import week10_deload from './block2/week10_deload';
import { Plan } from '../../types/data.types';

const pushPullLegs: Plan = {
  name: 'Push Pull Legs',
  id: 'ppl',
  unitsPerWeek: 6,
  shortDescription: 'Klassischer 3er-Split',
  description: 'Klassischer 3er-Split. Viele weitere Infos...',
  workouts: [
    ...week1,
    ...week2,
    ...week3,
    ...week4,
    ...week5_deload,
    ...week6,
    ...week7,
    ...week8,
    ...week9,
    ...week10_deload,
  ],
};

export default pushPullLegs;
