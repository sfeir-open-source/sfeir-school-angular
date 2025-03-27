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
    'unit-tests/jest/introduction.md',
    'unit-tests/jest/mock.md',
    'unit-tests/angular-testing-library/introduction.md',
    'unit-tests/angular-testing-library/core-concepts.md',
    'unit-tests/angular-testing-library/exemple.md',
    'unit-tests/exercice.md',
  ];
}

function pwaSlides() {
  return ['pwa/transition_slide.md', 'pwa/introduction.md', 'pwa/service_worker_configuration.md', 'pwa/service_worker_communication.md'];
}

function serverSideSlides() {
  return ['server-side/transition_slide.md', 'server-side/introduction.md'];
}

function librarySlides() {
  return ['library/transition_slide.md', 'library/introduction.md', 'library/library.md', 'library/ng-packager.md', 'library/dependencies.md'];
}

function nativeFederationSlides() {
  return ['native-federation/transition_slide.md', 'native-federation/introduction.md', 'native-federation/setup-native-federation.md'];
}

export function dayFourSlides() {
  return [
    ...stateManagementElf(),
    ...stateManagementNgxs(),
    ...stateManagementNgrx(),
    ...unitTestSlides(),
    ...pwaSlides(),
    ...serverSideSlides(),
    ...librarySlides(),
    ...nativeFederationSlides(),
  ];
}
