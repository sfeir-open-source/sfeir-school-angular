import { SfeirThemeInitializer } from '../web_modules/sfeir-school-theme/dist/sfeir-school-theme.mjs';

import { dayFourSlides } from './day_four.js';
import { dayOneSlides } from './day_one.js';
import { dayThreeSlides } from './day_three.js';
import { dayTwoSlides } from './day_two.js';

/*
typeShow = 'all': ignore filtering, show every slides
typeShow = 'on-stage' (default type in sfeir theme): show the full formation with all modules
typeShow = 'modern-2days': show only slides for Modern Angular in 2 days
*/

function sfeirInstitute(typeShow) {
  console.log({ typeShow });
  const formationSlides = [...dayOneSlides(), ...dayTwoSlides(), ...dayThreeSlides(), ...dayFourSlides()];
  return formationSlides
    .map(slide => {
      if (typeof slide === 'string') {
        return { path: slide };
      } else {
        return slide;
      }
    })
    .filter(slide => slide.typeShow == undefined || slide.typeShow.includes(typeShow));
}

SfeirThemeInitializer.init(sfeirInstitute);
