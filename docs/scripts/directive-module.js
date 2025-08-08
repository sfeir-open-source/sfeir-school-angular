function introductionSLides() {
  return ['state-management/angular_300.md', 'speaker/00-nicolas-frizzarin.md', 'presentation/01-fLOW-SCHOOL.md'];
}

function recapSlides() {
  return [
    'directive/00-TRANSITION-SLIDE.md',
    'directive/01-INTRODUCTION.md',
    'directive/exercice_directive_use.md',
    'directive/custom_directive.md',
    'directive/exercice_create_directive.md',
  ];
}

function directiveTemplatingSlide() {
  return [
    'templating/00-TRANSITION-SLIDE.md',
    'templating/01-INTRODUCTION.md',
    'templating/ng-template.md',
    'templating/ng-container.md',
    'templating/ng-content.md',
    'templating/reference.md',
    'templating/100-LAB.md',
  ];
}

function hostListenerHostBindingSlides() {
  return [
    'directive/host_binding_listener.md',
    'directive/host_binding.md',
    'directive/host_listener.md',
    'directive/exercice_host_binding_listener.md',
  ];
}

function structuralDirectivesSlides() {
  return [
    'directive/structural_transition_slide.md',
    'directive/structural_definition.md',
    'directive/structural_directive_providers.md',
    'directive/exercice_structural.md',
  ];
}

export function moduleDirectiveSlides() {
  return [
    ...introductionSLides(),
    ...recapSlides(),
    ...directiveTemplatingSlide(),
    ...hostListenerHostBindingSlides(),
    ...structuralDirectivesSlides(),
  ];
}
