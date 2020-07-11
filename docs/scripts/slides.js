import { dayOneSlides } from './day_one.js';
import { dayTwoSlides } from './day_two.js';
import { dayThreeSLides } from './day_three.js';
import { dayFourSlides } from './day_four.js'

function formation() {
  const formationSLides = [
    ...dayOneSlides(),
    ...dayTwoSlides(),
    ...dayThreeSLides(),
    ...dayFourSlides(),
  ];
  return formationSLides.map(slidePath => {
    return { path: slidePath };
  });
}

export function usedSlides() {
  return formation();
};
