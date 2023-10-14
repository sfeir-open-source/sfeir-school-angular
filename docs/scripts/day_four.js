function stateManagementElf() {
  return [
    'state-management/angular_500.md',
    'state-management/transition_slide.md',
    'state-management/introduction.md',
    'state-management/elf/introduction.md',
    'state-management/elf/store.md',
    'state-management/elf/entities.md',
  ];
}

function stateManagementNgxs() {
  return [
    'state-management/ngxs/introduction.md',
    'state-management/ngxs/store.md',
    'state-management/ngxs/actions.md',
    'state-management/ngxs/state.md',
    'state-management/ngxs/selectors.md',
    'state-management/ngxs/exercice.md',
  ];
}

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
}

function unitTestSlides() {
  return [
    'unit-tests/transition_slide.md',
    'unit-tests/tools.md',
    'unit-tests/concepts.md',
    'unit-tests/components/introduction.md',
    'unit-tests/components/exemple.md',
    'unit-tests/directives/introduction.md',
    'unit-tests/directives/exemple.md',
    'unit-tests/services/introduction.md',
    'unit-tests/services/helpers_service.md',
    'unit-tests/services/http_service.md',
    'unit-tests/pipes/introduction.md',
    'unit-tests/pipes/exemple.md',
    'unit-tests/exercice.md',
  ];
}

function standaloneComponents() {
  return [
    'standalone-components/transition_slide.md',
    'standalone-components/introduction.md',
    'standalone-components/routing.md',
    'standalone-components/injector.md',
    'standalone-components/exercice.md',
  ];
}
function signals() {
  return ['signals/transition_slide.md', 'signals/introduction.md', 'signals/signals.md', 'signals/exercice.md'];
}

function pwaSlides() {
  return ['pwa/transition_slide.md', 'pwa/introduction.md', 'pwa/service_worker_configuration.md', 'pwa/service_worker_communication.md'];
}

function serverSideSlides() {
  return ['server-side/transition_slide.md', 'server-side/introduction.md'];
}

export function dayFourSlides() {
  return [
    ...stateManagementElf(),
    ...stateManagementNgxs(),
    ...stateManagementNgrx(),
    ...unitTestSlides(),
    ...standaloneComponents(),
    ...signals(),
    ...pwaSlides(),
    ...serverSideSlides(),
  ];
}
