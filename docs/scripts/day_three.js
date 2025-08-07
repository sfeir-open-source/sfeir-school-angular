function lazyLoadingSlides() {
  const NAVIGATION = 'navigation';
  return [
    `${NAVIGATION}/ANGULAR-300.md`,
    `${NAVIGATION}/04-LAZY-LOADING-TRANSITION-SLIDE.md`,
    `${NAVIGATION}/05-LAZY-LOADING-PRINCIPES.md`,
    `${NAVIGATION}/06-LAZY-LOADING-ROUTE-DEFINITION.md`,
    `${NAVIGATION}/07-LAZY-LOADING-ROUTE-DEFINITION-CHILD.md`,
  ];
}

function guardsSlides() {
  const NAVIGATION = 'navigation';
  return [
    `${NAVIGATION}/08-GUARDS-TRANSITION-SLIDE.md`,
    `${NAVIGATION}/09-GUARDS-INTRODUCTION.md`,
    `${NAVIGATION}/10-GUARDS-VERIFICATION.md`,
    `${NAVIGATION}/11-GUARDS-RESOLVER.md`,
    `${NAVIGATION}/101-LAB.md`,
    `${NAVIGATION}/102-LAB.md`,
  ];
}

function interceptorsSlides() {
  const INTERCEPTORS = 'interceptors';
  return [
    `${INTERCEPTORS}/00-TRANSITION-SLIDE.md`,
    `${INTERCEPTORS}/01-CONCEPTS.md`,
    `${INTERCEPTORS}/02-MODIFICATION.md`,
    `${INTERCEPTORS}/03-REGISTER.md`,
    `${INTERCEPTORS}/04-CONTEXT.md`,
    `${INTERCEPTORS}/100-LAB.md`,
  ];
}

function templatingSlides() {
  const TEMPLATING = 'templating';
  return [
    `${TEMPLATING}/00-TRANSITION-SLIDE.md`,
    `${TEMPLATING}/01-INTRODUCTION.md`,
    `${TEMPLATING}/02-NG-TEMPLATE.md`,
    `${TEMPLATING}/03-NG-CONTAINER.md`,
    `${TEMPLATING}/04-NG-CONTENT.md`,
    `${TEMPLATING}/05-REFERENCE.md`,
    `${TEMPLATING}/100-LAB.md`,
  ];
}

function hostDirectivesSlides() {
  const DIRECTIVE = 'directive';
  return [
    `${DIRECTIVE}/03-HOST-BINDING-LISTENER.md`,
    `${DIRECTIVE}/04-HOST-BINDING.md`,
    `${DIRECTIVE}/05-HOST-LISTENER.md`,
    `${DIRECTIVE}/101-LAB.md`,
  ];
}

function structuralDirectiveSlides() {
  const DIRECTIVE = 'directive';
  return [
    `${DIRECTIVE}/ANGULAR-400.md`,
    `${DIRECTIVE}/06-STRUCTURAL-TRANSITION-SLIDE.md`,
    `${DIRECTIVE}/07-STRUCTURAL-DEFINITION.md`,
    `${DIRECTIVE}/08-STRUCTURAL-PROVIDERS.md`,
    `${DIRECTIVE}/102-LAB.md`,
  ];
}

function customFormControlSlides() {
  const FORMS = 'forms';
  return [
    `${FORMS}/custom-control/00-TRANSITION-SLIDE.md`,
    `${FORMS}/custom-control/01-INTRODUCTION.md`,
    `${FORMS}/custom-control/02-SETUP.md`,
    `${FORMS}/custom-control/100-LAB.md`,
  ];
}

function changeDetectionSlides() {
  const CHANGE_DETECTION = 'change-detection';
  return [
    `${CHANGE_DETECTION}/00-TRANSITION-SLIDE.md`,
    `${CHANGE_DETECTION}/01-INTRODUCTION.md`,
    `${CHANGE_DETECTION}/02-CHANGE-DETECTION-SERVICE.md`,
    `${CHANGE_DETECTION}/03-ZONELESS.md`,
  ];
}

export function dayThreeSLides() {
  return [
    ...lazyLoadingSlides(),
    ...guardsSlides(),
    ...interceptorsSlides(),
    ...templatingSlides(),
    ...hostDirectivesSlides(),
    ...structuralDirectiveSlides(),
    ...customFormControlSlides(),
    ...changeDetectionSlides(),
  ];
}
