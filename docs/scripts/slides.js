import { dayOneSlides } from './day_one.js';
import { dayTwoSlides } from './day_two.js';
import { dayThreeSLides } from './day_three.js';
import { dayFourSlides } from './day_four.js';
import { moduleDirectivSlides } from './directive-module.js';

function sfeirInstitute() {
  const formationSLides = [...dayOneSlides(), ...dayTwoSlides(), ...dayThreeSLides(), ...dayFourSlides()];
  return formationSLides.map(slidePath => {
    return { path: slidePath };
  });
}

function sfeirModuleDirective() {
  return moduleDirectivSlides().map(slidePath => ({ path: slidePath }));
}

export function usedSlides() {
  return sfeirInstitute();
}
