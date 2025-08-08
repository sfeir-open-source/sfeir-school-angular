import { SfeirThemeInitializer } from '../web_modules/sfeir-school-theme/sfeir-school-theme.mjs';

import { dayFourSlides } from './day_four.js';
import { dayOneSlides } from './day_one.js';
import { dayThreeSLides } from './day_three.js';
import { dayTwoSlides } from './day_two.js';

function sfeirInstitute() {
  const formationSlides = [...dayOneSlides(), ...dayTwoSlides(), ...dayThreeSLides(), ...dayFourSlides()];
  return formationSlides.map(slidePath => {
    return { path: slidePath };
  });
}

SfeirThemeInitializer.init(sfeirInstitute);
