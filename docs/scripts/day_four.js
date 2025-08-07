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
  const UNIT_TESTS = 'unit-tests';
  return [
    `${UNIT_TESTS}/00-TRANSITION-SLIDE.md`,
    `${UNIT_TESTS}/01-TOOLS.md`,
    `${UNIT_TESTS}/02-CONCEPTS.md`,
    `${UNIT_TESTS}/components/01-INTRODUCTION.md`,
    `${UNIT_TESTS}/components/02-EXAMPLE.md`,
    `${UNIT_TESTS}/directives/01-INTRODUCTION.md`,
    `${UNIT_TESTS}/directives/02-EXAMPLE.md`,
    `${UNIT_TESTS}/services/01-INTRODUCTION.md`,
    `${UNIT_TESTS}/services/02-HELPERS-SERVICE.md`,
    `${UNIT_TESTS}/services/03-HTTP-SERVICE.md`,
    `${UNIT_TESTS}/pipes/01-INTRODUCTION.md`,
    `${UNIT_TESTS}/pipes/02-EXAMPLE.md`,
    `${UNIT_TESTS}/jest/01-INTRODUCTION.md`,
    `${UNIT_TESTS}/jest/02-MOCK.md`,
    `${UNIT_TESTS}/angular-testing-library/01-INTRODUCTION.md`,
    `${UNIT_TESTS}/angular-testing-library/02-CORE-CONCEPTS.md`,
    `${UNIT_TESTS}/angular-testing-library/03-EXAMPLE.md`,
    `${UNIT_TESTS}/100-LAB.md`,
  ];
}

function pwaSlides() {
  const PWA = 'pwa';
  return [
    `${PWA}/00-TRANSITION-SLIDE.md`,
    `${PWA}/01-INTRODUCTION.md`,
    `${PWA}/02-SERVICE-WORKER-CONFIGURATION.md`,
    `${PWA}/03-SERVICE-WORKER-COMMUNICATION.md`,
  ];
}

function serverSideSlides() {
  const SERVER_SIDE = 'server-side';
  return [`${SERVER_SIDE}/00-TRANSITION-SLIDE.md`, `${SERVER_SIDE}/01-INTRODUCTION.md`];
}

function librarySlides() {
  const LIBRARY = 'library';
  return [
    `${LIBRARY}/00-TRANSITION-SLIDE.md`,
    `${LIBRARY}/01-INTRODUCTION.md`,
    `${LIBRARY}/02-LIBRARY.md`,
    `${LIBRARY}/03-NG-PACKAGR.md`,
    `${LIBRARY}/04-DEPENDENCIES.md`,
  ];
}

function nativeFederationSlides() {
  const NATIVE_FEDERATION = 'native-federation';
  return [
    `${NATIVE_FEDERATION}/00-TRANSITION-SLIDE.md`,
    `${NATIVE_FEDERATION}/01-INTRODUCTION.md`,
    `${NATIVE_FEDERATION}/02-SETUP-NATIVE-FEDERATION.md`,
  ];
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
