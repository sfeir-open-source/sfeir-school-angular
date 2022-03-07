function lazyLoadingSlides() {
  return [
    'navigation/angular_300.md',
    'navigation/lazy_loading_transition_slide.md',
    'navigation/lazy_loading_principes.md',
    'navigation/lazy_loading_route_definition.md',
    'navigation/lazy_loading_route_definition_child.md',
  ];
};

function guardsSlides() {
  return [
    'navigation/guards_transition_slide.md',
    'navigation/guards_introduction.md',
    'navigation/guards_verification.md',
    'navigation/guards_resolver.md',
    'navigation/exercice_lazyload_guards.md',
    'navigation/exercice_resolver.md',
  ];
};

function interceptorsSlides() {
  return [
    'interceptors/transition_slide.md',
    'interceptors/concepts.md',
    'interceptors/modification.md',
    'interceptors/register.md',
    'interceptors/context.md',
    'interceptors/exercice.md',
  ];
};

function templatingSlides() {
  return [
    'templating/transition_slide.md',
    'templating/introduction.md',
    'templating/ng-template.md',
    'templating/ng-container.md',
    'templating/reference.md',
    'templating/exercice.md',
  ];
};

function hostDirectivesSlides() {
  return [
    'directive/host_binding_listener.md',
    'directive/host_binding.md',
    'directive/host_listener.md',
    'directive/exercice_host_binding_listener.md',
  ];
};

function structuralDirectiveSlides() {
  return [
    'directive/angular_400.md',
    'directive/structural_transition_slide.md',
    'directive/structural_definition.md',
    'directive/exercice_structural.md',
  ];
};

function customFormControlSlides() {
  return [
    'forms/custom-control/transition_slide.md',
    'forms/custom-control/introduction.md',
    'forms/custom-control/setup.md',
    'forms/custom-control/exercice.md',
  ];
};



function changeDetectionSlides() {
  return [
    'change-detection/transition_slide.md',
    'change-detection/introduction.md',
    'change-detection/change_detection_service.md',
  ];
};

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
};

