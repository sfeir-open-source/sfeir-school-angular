import { showByDefault } from './utils.js';

function stateManagementElf() {
  const STATE_MANAGEMENT = '24-STATE-MANAGEMENT';
  return [
    `${STATE_MANAGEMENT}/ANGULAR-500.md`,
    `${STATE_MANAGEMENT}/00-TRANSITION-SLIDE.md`,
    `${STATE_MANAGEMENT}/01-INTRODUCTION.md`,
    `${STATE_MANAGEMENT}/ELF/01-INTRODUCTION.md`,
    `${STATE_MANAGEMENT}/ELF/02-STORE.md`,
    `${STATE_MANAGEMENT}/ELF/03-ENTITIES.md`,
    `${STATE_MANAGEMENT}/ELF/100-LAB.md`,
  ].map(showByDefault);
}

function stateManagementNgxs() {
  const STATE_MANAGEMENT_NGXS = '24-STATE-MANAGEMENT/NGXS';

  return [
    `${STATE_MANAGEMENT_NGXS}/01-INTRODUCTION.md`,
    `${STATE_MANAGEMENT_NGXS}/02-STORE.md`,
    `${STATE_MANAGEMENT_NGXS}/03-ACTIONS.md`,
    `${STATE_MANAGEMENT_NGXS}/04-STATE.md`,
    `${STATE_MANAGEMENT_NGXS}/05-SELECTORS.md`,
    `${STATE_MANAGEMENT_NGXS}/06-NGXS-SIGNALS.md`,
    `${STATE_MANAGEMENT_NGXS}/100-LAB.md`,
  ].map(showByDefault);
}

function stateManagementNgrx() {
  const STATE_MANAGEMENT_NGRX = '24-STATE-MANAGEMENT/NGRX';
  return [
    `${STATE_MANAGEMENT_NGRX}/01-INTRODUCTION.md`,
    `${STATE_MANAGEMENT_NGRX}/02-ACTIONS.md`,
    `${STATE_MANAGEMENT_NGRX}/03-STATE.md`,
    `${STATE_MANAGEMENT_NGRX}/04-SELECTORS.md`,
    `${STATE_MANAGEMENT_NGRX}/05-REDUCERS.md`,
    `${STATE_MANAGEMENT_NGRX}/06-STORE.md`,
    `${STATE_MANAGEMENT_NGRX}/07-EFFECTS.md`,
    `${STATE_MANAGEMENT_NGRX}/100-LAB.md`,
  ].map(showByDefault);
}

function unitTestSlides() {
  const UNIT_TESTS = '25-UNIT-TESTS';
  return [
    `${UNIT_TESTS}/00-TRANSITION-SLIDE.md`,
    `${UNIT_TESTS}/01-TOOLS.md`,
    `${UNIT_TESTS}/02-CONCEPTS.md`,
    `${UNIT_TESTS}/COMPONENTS/01-INTRODUCTION.md`,
    `${UNIT_TESTS}/COMPONENTS/02-EXAMPLE.md`,
    showByDefault(`${UNIT_TESTS}/DIRECTIVES/01-INTRODUCTION.md`),
    showByDefault(`${UNIT_TESTS}/DIRECTIVES/02-EXAMPLE.md`),
    `${UNIT_TESTS}/SERVICES/01-INTRODUCTION.md`,
    `${UNIT_TESTS}/SERVICES/02-HELPERS-SERVICE.md`,
    `${UNIT_TESTS}/SERVICES/03-HTTP-SERVICE.md`,
    `${UNIT_TESTS}/PIPES/01-INTRODUCTION.md`,
    `${UNIT_TESTS}/PIPES/02-EXAMPLE.md`,
    `${UNIT_TESTS}/JEST/01-INTRODUCTION.md`,
    `${UNIT_TESTS}/JEST/02-MOCK.md`,
    `${UNIT_TESTS}/ANGULAR-TESTING-LIBRARY/01-INTRODUCTION.md`,
    `${UNIT_TESTS}/ANGULAR-TESTING-LIBRARY/02-CORE-CONCEPTS.md`,
    `${UNIT_TESTS}/ANGULAR-TESTING-LIBRARY/03-EXAMPLE.md`,
    `${UNIT_TESTS}/100-LAB.md`,
  ];
}

function pwaSlides() {
  const PWA = '26-PWA';
  return [
    `${PWA}/00-TRANSITION-SLIDE.md`,
    `${PWA}/01-INTRODUCTION.md`,
    `${PWA}/02-SERVICE-WORKER-CONFIGURATION.md`,
    `${PWA}/03-SERVICE-WORKER-COMMUNICATION.md`,
  ].map(showByDefault);
}

function serverSideSlides() {
  const SERVER_SIDE = '27-SERVER-SIDE';
  return [
    `${SERVER_SIDE}/00-TRANSITION-SLIDE.md`, //
    `${SERVER_SIDE}/01-INTRODUCTION.md`, //
  ].map(showByDefault);
}

function librarySlides() {
  const LIBRARY = '28-LIBRARY';
  return [
    `${LIBRARY}/00-TRANSITION-SLIDE.md`,
    `${LIBRARY}/01-INTRODUCTION.md`,
    `${LIBRARY}/02-LIBRARY.md`,
    `${LIBRARY}/03-NG-PACKAGR.md`,
    `${LIBRARY}/04-DEPENDENCIES.md`,
  ].map(showByDefault);
}

function nativeFederationSlides() {
  const NATIVE_FEDERATION = '29-NATIVE-FEDERATION';
  return [
    `${NATIVE_FEDERATION}/00-TRANSITION-SLIDE.md`,
    `${NATIVE_FEDERATION}/01-INTRODUCTION.md`,
    `${NATIVE_FEDERATION}/02-SETUP-NATIVE-FEDERATION.md`,
  ].map(showByDefault);
}

function performancesSlides() {
  const PERFORMANCES = '30-PERFORMANCES';
  return [
    `${PERFORMANCES}/00-TRANSITION-SLIDE.md`,
    `${PERFORMANCES}/01-IMAGES.md`,
    `${PERFORMANCES}/02-DEFERRED-VIEWS.md`,
    `${PERFORMANCES}/03-LAZYLOAD-COMPONENT.md`,
    `${PERFORMANCES}/100-LAB.md`,
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
    ...performancesSlides(),
  ];
}
