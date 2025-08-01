function stateManagementElf() {
  const STATE_MANAGEMENT = 'state-management';
  return [
    `${STATE_MANAGEMENT}/ANGULAR-500.md`,
    `${STATE_MANAGEMENT}/00-TRANSITION-SLIDE.md`,
    `${STATE_MANAGEMENT}/01-INTRODUCTION.md`,
    `${STATE_MANAGEMENT}/elf/01-INTRODUCTION.md`,
    `${STATE_MANAGEMENT}/elf/02-STORE.md`,
    `${STATE_MANAGEMENT}/elf/03-ENTITIES.md`,
    `${STATE_MANAGEMENT}/elf/100-LAB.md`,
  ];
}

function stateManagementNgxs() {
  const STATE_MANAGEMENT_NGXS = 'state-management/ngxs';

  return [
    `${STATE_MANAGEMENT_NGXS}/01-INTRODUCTION.md`,
    `${STATE_MANAGEMENT_NGXS}/02-STORE.md`,
    `${STATE_MANAGEMENT_NGXS}/03-ACTIONS.md`,
    `${STATE_MANAGEMENT_NGXS}/04-STATE.md`,
    `${STATE_MANAGEMENT_NGXS}/05-SELECTORS.md`,
    `${STATE_MANAGEMENT_NGXS}/06-NGRX-SIGNALS.md`,
    `${STATE_MANAGEMENT_NGXS}/100-LAB.md`,
  ];
}

function stateManagementNgrx() {
  const STATE_MANAGEMENT_NGRX = 'state-management/ngrx';
  return [
    `${STATE_MANAGEMENT_NGRX}/01-INTRODUCTION.md`,
    `${STATE_MANAGEMENT_NGRX}/02-ACTIONS.md`,
    `${STATE_MANAGEMENT_NGRX}/03-STATE.md`,
    `${STATE_MANAGEMENT_NGRX}/04-SELECTORS.md`,
    `${STATE_MANAGEMENT_NGRX}/05-REDUCERS.md`,
    `${STATE_MANAGEMENT_NGRX}/06-STORE.md`,
    `${STATE_MANAGEMENT_NGRX}/07-EFFECTS.md`,
    `${STATE_MANAGEMENT_NGRX}/100-LAB.md`,
  ];
}

function unitTestSlides() {
  return [
    'unit-tests/00-TRANSITION-SLIDE.md',
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
    'unit-tests/100-LAB.md',
  ];
}

function pwaSlides() {
  return ['pwa/00-TRANSITION-SLIDE.md', 'pwa/introduction.md', 'pwa/service_worker_configuration.md', 'pwa/service_worker_communication.md'];
}

function serverSideSlides() {
  return ['server-side/00-TRANSITION-SLIDE.md', 'server-side/introduction.md'];
}

function librarySlides() {
  return ['library/00-TRANSITION-SLIDE.md', 'library/introduction.md', 'library/library.md', 'library/ng-packager.md', 'library/dependencies.md'];
}

function nativeFederationSlides() {
  return ['native-federation/00-TRANSITION-SLIDE.md', 'native-federation/introduction.md', 'native-federation/setup-native-federation.md'];
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
