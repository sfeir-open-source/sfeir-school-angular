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

function controlFlowSlides() {
  const CONTROL_FLOW = 'control-flow';
  return [`${CONTROL_FLOW}/00-TRANSITION-SLIDE.md`, `${CONTROL_FLOW}/01-INTRODUCTION.md`, `${CONTROL_FLOW}/100-LAB.md`];
}

function directiveSlides() {
  const DIRECTIVE = 'directive';
  return [`${DIRECTIVE}/00-TRANSITION-SLIDE.md`, `${DIRECTIVE}/02-CUSTOM-DIRECTIVE.md`, `${DIRECTIVE}/100-LAB.md`];
}

function templateDrivenForms() {
  const FORMS = 'forms';
  return [
    `${FORMS}/00-TRANSITION-SLIDE.md`,
    `${FORMS}/template-driven-forms/01-INTRODUCTION.md`,
    `${FORMS}/template-driven-forms/100-LAB.md`,
    `${FORMS}/template-driven-forms/02-VALIDATION.md`,
    `${FORMS}/template-driven-forms/101-LAB.md`,
    `${FORMS}/template-driven-forms/102-LAB.md`,
  ];
}

function reactiveFormSlides() {
  const FORMS = 'forms';
  return [
    `${FORMS}/reactive-forms/01-INTRODUCTION.md`,
    `${FORMS}/reactive-forms/02-VALIDATION.md`,
    `${FORMS}/reactive-forms/100-LAB.md`,
    `${FORMS}/reactive-forms/03-CUSTOM-VALIDATION.md`,
    `${FORMS}/reactive-forms/101-LAB.md`,
    `${FORMS}/01-SUMMARY.md`,
  ];
}

export function dayTwoSlides() {
  return [
    ...providersSlide(),
    ...dependencyInjectionSlides(),
    ...pipeSlides(),
    ...controlFlowSlides(),
    ...directiveSlides(),
    ...templateDrivenForms(),
    ...reactiveFormSlides(),
  ];
}
