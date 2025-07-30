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
  return [
    'directive/host_binding_listener.md',
    'directive/host_binding.md',
    'directive/host_listener.md',
    'directive/exercice_host_binding_listener.md',
  ];
}

function structuralDirectiveSlides() {
  return [
    'directive/angular_400.md',
    'directive/structural_transition_slide.md',
    'directive/structural_definition.md',
    'directive/exercice_structural.md',
  ];
}

function customFormControlSlides() {
  return [
    'forms/custom-control/00-TRANSITION-SLIDE.md',
    'forms/custom-control/introduction.md',
    'forms/custom-control/setup.md',
    'forms/custom-control/100-LAB.md',
  ];
}

function changeDetectionSlides() {
  return ['change-detection/00-TRANSITION-SLIDE.md', 'change-detection/introduction.md', 'change-detection/change_detection_service.md'];
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
