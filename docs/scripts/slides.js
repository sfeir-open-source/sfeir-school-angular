import { SfeirThemeInitializer } from '../web_modules/sfeir-school-theme/sfeir-school-theme.mjs';
import { AngularModernApplication } from './angular-modern-application.js';
import { dayFiveSlide } from './day_five.js';
import { dayFourSlides } from './day_four.js';
import { dayOneSlides } from './day_one.js';
import { dayThreeSLides } from './day_three.js';
import { dayTwoSlides } from './day_two.js';
import { moduleDirectiveSlides } from './directive-module.js';

function sfeirInstitute() {
  const formationSLides = [...dayOneSlides(), ...dayTwoSlides(), ...dayThreeSLides(), ...dayFourSlides(), ...dayFiveSlide()];
  return formationSLides.map(slidePath => {
    return { path: slidePath };
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function sfeirModuleDirective() {
  return moduleDirectiveSlides().map(slidePath => ({ path: slidePath }));
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function angularModernApplication() {
  return AngularModernApplication().map(slidePath => ({ path: slidePath }));
}

SfeirThemeInitializer.init(sfeirInstitute);
