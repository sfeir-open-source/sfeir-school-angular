function providersSlide() {
  const PROVIDERS = '12-PROVIDERS';
  return [`${PROVIDERS}/SCHOOL-200.md`, `${PROVIDERS}/00-TRANSITION-SLIDE.md`, `${PROVIDERS}/01-INTRODUCTION.md`, `${PROVIDERS}/100-LAB.md`];
}

function dependencyInjectionSlides() {
  const DEPENDENCY_INJECTION = '13-DEPENDENCY-INJECTION';
  return [
    `${DEPENDENCY_INJECTION}/00-TRANSITION-SLIDE.md`,
    `${DEPENDENCY_INJECTION}/01-BASICS.md`,
    `${DEPENDENCY_INJECTION}/02-DI-WORKING.md`,
    `${DEPENDENCY_INJECTION}/03-DI-RESOLUTION.md`,
  ];
}

function pipeSlides() {
  const PIPE = '14-PIPE';
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
  const CONTROL_FLOW = '15-CONTROL-FLOW';
  return [`${CONTROL_FLOW}/00-TRANSITION-SLIDE.md`, `${CONTROL_FLOW}/01-INTRODUCTION.md`, `${CONTROL_FLOW}/100-LAB.md`];
}

function directiveSlides() {
  const DIRECTIVE = '16-directive';
  return [`${DIRECTIVE}/00-TRANSITION-SLIDE.md`, `${DIRECTIVE}/01-CUSTOM-DIRECTIVE.md`, `${DIRECTIVE}/100-LAB.md`];
}

function templateDrivenForms() {
  const FORMS = '17-FORMS';
  return [
    `${FORMS}/00-TRANSITION-SLIDE.md`,
    `${FORMS}/TEMPLATE-DRIVEN-FORMS/01-INTRODUCTION.md`,
    `${FORMS}/TEMPLATE-DRIVEN-FORMS/100-LAB.md`,
    `${FORMS}/TEMPLATE-DRIVEN-FORMS/02-VALIDATION.md`,
    `${FORMS}/TEMPLATE-DRIVEN-FORMS/101-LAB.md`,
    `${FORMS}/TEMPLATE-DRIVEN-FORMS/102-LAB.md`,
  ];
}

function reactiveFormSlides() {
  const FORMS = '17-FORMS';
  return [
    `${FORMS}/REACTIVE-FORMS/01-INTRODUCTION.md`,
    `${FORMS}/REACTIVE-FORMS/02-VALIDATION.md`,
    `${FORMS}/REACTIVE-FORMS/100-LAB.md`,
    `${FORMS}/REACTIVE-FORMS/03-CUSTOM-VALIDATION.md`,
    `${FORMS}/REACTIVE-FORMS/101-LAB.md`,
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
