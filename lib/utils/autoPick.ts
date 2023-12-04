import { rng } from './rng';

export function autoPick(minRange: number, maxRange: number, maxLength: number): number[] {
  let ticket: number[] = [];

  outer: for (let i = 0; i < maxLength; i++) {
    const number = rng(minRange, maxRange);

    for (let j = 0; j < maxLength; j++) {
      if (number === ticket[j]) {
        i--;
        continue outer;
      }
    }

    ticket.push(number);
  }

  return ticket;
}
