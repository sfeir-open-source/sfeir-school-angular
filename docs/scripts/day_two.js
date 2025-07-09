function providersSlide() {
  return ['providers/school_200.md', 'providers/00-TRANSITION-SLIDE.md', 'providers/introduction.md', 'providers/exercice.md'];
}

function dependencyInjectionSlides() {
  return [
    'dependency-injection/00-TRANSITION-SLIDE.md',
    'dependency-injection/basics.md',
    'dependency-injection/di_working.md',
    'dependency-injection/di_resolution.md',
  ];
}

function pipeSlides() {
  return [
    'pipe/00-TRANSITION-SLIDE.md',
    'pipe/introduction.md',
    'pipe/syntax.md',
    'pipe/exercice_use_pipe.md',
    'pipe/custom_pipe.md',
    'pipe/exercice_custom_pipe.md',
  ];
}

function directiveSlides() {
  return [
    'directive/00-TRANSITION-SLIDE.md',
    'directive/introduction.md',
    'directive/exercice_directive_use.md',
    'directive/custom_directive.md',
    'directive/exercice_create_directive.md',
  ];
}

function templateDrivenForms() {
  return [
    'forms/00-TRANSITION-SLIDE.md',
    'forms/template-driven-forms/introduction.md',
    'forms/template-driven-forms/exercice_create_form.md',
    'forms/template-driven-forms/validation.md',
    'forms/template-driven-forms/exercice_validation.md',
    'forms/template-driven-forms/exercice_update_form.md',
  ];
}

function reactiveFormSlides() {
  return [
    'forms/reactive-forms/introduction.md',
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
