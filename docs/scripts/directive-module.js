function introductionSLides() {
  return ['state-management/angular_300.md', 'speaker/nicolas_frizzarin.md', 'presentation/flow_school.md'];
}

function recapSlides() {
  return [
    'directive/transition_slide.md',
    'directive/introduction.md',
    'directive/exercice_directive_use.md',
    'directive/custom_directive.md',
    'directive/exercice_create_directive.md'
  ];
}

function directiveTemplatingSlide() {
  return [
    'templating/transition_slide.md',
    'templating/introduction.md',
    'templating/ng-template.md',
    'templating/ng-container.md',
    'templating/ng-content.md',
    'templating/reference.md',
    'templating/exercice.md'
  ];
}

function hostListenerHostBindingSlides() {
  return [
    'directive/host_binding_listener.md',
    'directive/host_binding.md',
    'directive/host_listener.md',
    'directive/exercice_host_binding_listener.md'
  ];
}

function structuralDirectivesSlides() {
  return [
    'directive/structural_transition_slide.md',
    'directive/structural_definition.md',
    'directive/structural_directive_providers.md',
    'directive/exercice_structural.md'
  ];
}

export function moduleDirectivSlides() {
  return [
    ...introductionSLides(),
    ...recapSlides(),
    ...directiveTemplatingSlide(),
    ...hostListenerHostBindingSlides(),
    ...structuralDirectivesSlides()
  ];
}
