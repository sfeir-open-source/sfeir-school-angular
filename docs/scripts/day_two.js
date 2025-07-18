function providersSlide() {
  const PROVIDERS = 'providers';
  return [`${PROVIDERS}/SCHOOL-200.md`, `${PROVIDERS}/00-TRANSITION-SLIDE.md`, `${PROVIDERS}/01-INTRODUCTION.md`, `${PROVIDERS}/100-LAB.md`];
}

function dependencyInjectionSlides() {
  const DEPENDENCY_INJECTION = 'dependency-injection';
  return [
    `${DEPENDENCY_INJECTION}/00-TRANSITION-SLIDE.md`,
    `${DEPENDENCY_INJECTION}/01-BASICS.md`,
    `${DEPENDENCY_INJECTION}/02-DI-WORKING.md`,
    `${DEPENDENCY_INJECTION}/03-DI-RESOLUTION.md`,
  ];
}

function pipeSlides() {
  return [
    'pipe/00-TRANSITION-SLIDE.md',
    'pipe/01-INTRODUCTION.md',
    'pipe/syntax.md',
    'pipe/exercice_use_pipe.md',
    'pipe/custom_pipe.md',
    'pipe/exercice_custom_pipe.md',
  ];
}

function directiveSlides() {
  return [
    'directive/00-TRANSITION-SLIDE.md',
    'directive/01-INTRODUCTION.md',
    'directive/exercice_directive_use.md',
    'directive/custom_directive.md',
    'directive/exercice_create_directive.md',
  ];
}

function templateDrivenForms() {
  return [
    'forms/00-TRANSITION-SLIDE.md',
    'forms/template-driven-forms/01-INTRODUCTION.md',
    'forms/template-driven-forms/exercice_create_form.md',
    'forms/template-driven-forms/validation.md',
    'forms/template-driven-forms/exercice_validation.md',
    'forms/template-driven-forms/exercice_update_form.md',
  ];
}

function reactiveFormSlides() {
  return [
    'forms/reactive-forms/01-INTRODUCTION.md',
    'forms/reactive-forms/validation.md',
    'forms/reactive-forms/exercice_validation.md',
    'forms/reactive-forms/custom_validation.md',
    'forms/reactive-forms/exercice_custom_validation.md',
    'forms/summary.md',
  ];
}

export function dayTwoSlides() {
  return [
    ...providersSlide(),
    ...dependencyInjectionSlides(),
    ...pipeSlides(),
    ...directiveSlides(),
    ...templateDrivenForms(),
    ...reactiveFormSlides(),
  ];
}
