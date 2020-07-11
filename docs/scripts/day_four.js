function interceptorsSlides() {
  return [
    'templating/angular_400.md',
    'interceptors/transition_slide.md',
    'interceptors/concepts.md',
    'interceptors/modification.md',
    'interceptors/register.md',
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

function customFormControlSlides() {
  return [
    'forms/custom-control/transition_slide.md',
    'forms/custom-control/introduction.md',
    'forms/custom-control/setup.md',
    'forms/custom-control/exercice.md',
  ];
};

function structuralDirectiveSlides() {
  return [
    'directive/angular_500.md',
    'directive/structural_transition_slide.md',
    'directive/structural_definition.md',
    'directive/exercice_structural.md',
  ];
};

function changeDetectionSlides() {
  return [
    'change-detection/transition_slide.md',
    'change-detection/introduction.md',
    'change-detection/change_detection_service.md',
  ];
};

function pwaSlides() {
  return [
    'pwa/transition_slide.md',
    'pwa/introduction.md',
    'pwa/service_worker_configuration.md',
    'pwa/service_worker_communication.md',
  ];
};

function serverSideSlides() {
  return [
    'server-side/transition_slide.md',
    'server-side/introduction.md',
  ];
};

export function dayFourSlides() {
  return [
    ...interceptorsSlides(),
    ...templatingSlides(),
    ...hostDirectivesSlides(),
    ...customFormControlSlides(),
    ...structuralDirectiveSlides(),
    ...changeDetectionSlides(),
    ...pwaSlides(),
    ...serverSideSlides(),
  ];
};
