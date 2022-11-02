import { SfeirThemeInitializer } from '../web_modules/sfeir-school-theme/sfeir-school-theme.mjs';
import { dayFourSlides } from './day_four.js';
import { dayOneSlides } from './day_one.js';
import { dayThreeSLides } from './day_three.js';
import { dayTwoSlides } from './day_two.js';
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

SfeirThemeInitializer.init(sfeirInstitute);
