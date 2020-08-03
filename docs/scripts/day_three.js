function stateManagementNgxs() {
  return [
    'state-management/angular_300.md',
    'state-management/transition_slide.md',
    'state-management/introduction.md',
    'state-management/ngxs/introduction.md',
    'state-management/ngxs/store.md',
    'state-management/ngxs/actions.md',
    'state-management/ngxs/state.md',
    'state-management/ngxs/selectors.md',
    'state-management/ngxs/exercice.md',
  ];
};

function stateManagementNgrx() {
  return [
    'state-management/ngrx/introduction.md',
    'state-management/ngrx/actions.md',
    'state-management/ngrx/state.md',
    'state-management/ngrx/selectors.md',
    'state-management/ngrx/reducers.md',
    'state-management/ngrx/store.md',
    'state-management/ngrx/effects.md',
    'state-management/ngrx/exercice.md',
  ];
};

function unitTestSlides() {
  return [
    'unit-tests/transition_slide.md',
    'unit-tests/tools.md',
    'unit-tests/concepts.md',
    'unit-tests/components/introduction.md',
    'unit-tests/components/exemple.md',
    'unit-tests/components/exercice.md',
    'unit-tests/directives/introduction.md',
    'unit-tests/directives/exemple.md',
    'unit-tests/directives/exercice.md',
    'unit-tests/services/introduction.md',
    'unit-tests/services/helpers_service.md',
    'unit-tests/services/http_service.md',
    'unit-tests/services/exercice.md',
    'unit-tests/pipes/introduction.md',
    'unit-tests/pipes/exemple.md',
    'unit-tests/pipes/exercice.md',
  ];
};

function lazyLoadingSlides() {
  return [
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

export function dayThreeSLides() {
  return [
    ...stateManagementNgxs(),
    ...stateManagementNgrx(),
    ...unitTestSlides(),
    ...lazyLoadingSlides(),
    ...guardsSlides(),
  ];
};

