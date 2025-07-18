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
  const PIPE = 'pipe';
  return [
    `${PIPE}/00-TRANSITION-SLIDE.md`,
    `${PIPE}/01-INTRODUCTION.md`,
    `${PIPE}/02-SYNTAX.md`,
    `${PIPE}/100-LAB.md`,
    `${PIPE}/03-CUSTOM-PiPE.md`,
    `${PIPE}/101-LAB.md`,
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
