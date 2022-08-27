import { min, max } from './constants';

export function getRandomAmount() {
  return Math.floor(Math.random() * (max - min) + min);
}
