import { showByDefault, showOnModern2days } from './utils.js';

// Shown both in the full on-stage format and in the trimmed modern-2days format.
function core(slide) {
  return showOnModern2days(showByDefault(slide));
}

function unitTestingSlides() {
  const UNIT_TESTING = '26-UNIT-TESTING';
  return [
    core(`${UNIT_TESTING}/00-TRANSITION-SLIDE.md`),
    core(`${UNIT_TESTING}/01-TOOLS.md`),
    core(`${UNIT_TESTING}/02-CONCEPTS.md`),
    core(`${UNIT_TESTING}/ANGULAR-TESTING-LIBRARY/01-INTRODUCTION.md`),
    core(`${UNIT_TESTING}/ANGULAR-TESTING-LIBRARY/02-CORE-CONCEPTS.md`),
    core(`${UNIT_TESTING}/COMPONENTS/01-INTRODUCTION.md`),
    core(`${UNIT_TESTING}/COMPONENTS/02-EXAMPLE.md`),
    core(`${UNIT_TESTING}/DIRECTIVES/01-INTRODUCTION.md`),
    core(`${UNIT_TESTING}/DIRECTIVES/02-EXAMPLE.md`),
    core(`${UNIT_TESTING}/MOCKING/01-TEST-DOUBLES.md`),
    core(`${UNIT_TESTING}/SERVICES/01-INTRODUCTION.md`),
    core(`${UNIT_TESTING}/SERVICES/02-HTTP-SERVICE.md`),
    core(`${UNIT_TESTING}/SERVICES/03-GUARDS.md`),
    core(`${UNIT_TESTING}/ANGULAR-TESTING-LIBRARY/03-EXAMPLE.md`),
    showByDefault(`${UNIT_TESTING}/PIPES/01-INTRODUCTION.md`), // generic aside, no app-grounded example: trimmed from modern-2days
    core(`${UNIT_TESTING}/100-LAB.md`),
  ];
}

function ngrxSignalStoreSlides() {
  const NGRX_SIGNAL_STORE = '27-NGRX-SIGNAL-STORE';
  return [
    showByDefault(`${NGRX_SIGNAL_STORE}/ANGULAR-500.md`), // level badge slide, on-stage only (same convention as ANGULAR-300/400)
    core(`${NGRX_SIGNAL_STORE}/00-TRANSITION-SLIDE.md`),
    core(`${NGRX_SIGNAL_STORE}/01-INTRODUCTION.md`),
    showByDefault(`${NGRX_SIGNAL_STORE}/02-CLASSIC-NGRX-VS-SIGNALSTORE.md`), // historical detour, trimmed from modern-2days
    core(`${NGRX_SIGNAL_STORE}/03-CREATING-A-STORE.md`),
    core(`${NGRX_SIGNAL_STORE}/04-PROVIDING-INJECTING.md`),
    core(`${NGRX_SIGNAL_STORE}/05-READING-STATE.md`),
    core(`${NGRX_SIGNAL_STORE}/06-WITH-COMPUTED.md`),
    core(`${NGRX_SIGNAL_STORE}/07-WITH-PROPS.md`),
    core(`${NGRX_SIGNAL_STORE}/08-WITH-METHODS-PATCHSTATE.md`),
    core(`${NGRX_SIGNAL_STORE}/09-RXMETHOD.md`),
    core(`${NGRX_SIGNAL_STORE}/10-RXMETHOD-STAFF-DIRECTORY.md`),
    core(`${NGRX_SIGNAL_STORE}/11-RXMETHOD-ADVANCED.md`),
    core(`${NGRX_SIGNAL_STORE}/12-WITH-HOOKS.md`),
    core(`${NGRX_SIGNAL_STORE}/13-ROUTE-SCOPED-PROVIDERS.md`),
    core(`${NGRX_SIGNAL_STORE}/14-THIN-COMPONENT.md`),
    showByDefault(`${NGRX_SIGNAL_STORE}/15-ENTITY-MANAGEMENT.md`), // "going further" appendix, trimmed from modern-2days
    showByDefault(`${NGRX_SIGNAL_STORE}/16-CUSTOM-FEATURES.md`), // "going further" appendix, trimmed from modern-2days
    core(`${NGRX_SIGNAL_STORE}/17-TESTING.md`),
    core(`${NGRX_SIGNAL_STORE}/100-LAB.md`),
  ];
}

function changeDetectionZonelessSlides() {
  const CHANGE_DETECTION_ZONELESS = '28-CHANGE-DETECTION-ZONELESS';
  return [
    `${CHANGE_DETECTION_ZONELESS}/00-TRANSITION-SLIDE.md`,
    `${CHANGE_DETECTION_ZONELESS}/01-INTRODUCTION.md`,
    `${CHANGE_DETECTION_ZONELESS}/02-CHANGE-DETECTION-SERVICE.md`,
    `${CHANGE_DETECTION_ZONELESS}/03-ZONELESS.md`,
  ].map(showByDefault);
}

function pwaSlides() {
  const PWA = '29-PWA';
  return [
    `${PWA}/00-TRANSITION-SLIDE.md`,
    `${PWA}/01-INTRODUCTION.md`,
    `${PWA}/02-SERVICE-WORKER-CONFIGURATION.md`,
    `${PWA}/03-SERVICE-WORKER-COMMUNICATION.md`,
  ].map(showByDefault);
}

function serverSideRenderingSlides() {
  const SERVER_SIDE_RENDERING = '30-SERVER-SIDE-RENDERING';
  return [
    `${SERVER_SIDE_RENDERING}/00-TRANSITION-SLIDE.md`,
    `${SERVER_SIDE_RENDERING}/01-INTRODUCTION.md`,
    `${SERVER_SIDE_RENDERING}/02-SETUP-AND-RENDERING-MODES.md`,
    `${SERVER_SIDE_RENDERING}/03-SERVER-COMPATIBLE-CODE.md`,
    `${SERVER_SIDE_RENDERING}/04-HTTP-AND-HYDRATION.md`,
    `${SERVER_SIDE_RENDERING}/05-BEST-PRACTICES.md`,
  ].map(showByDefault);
}

function librariesSlides() {
  const LIBRARIES = '31-LIBRARIES';
  return [
    `${LIBRARIES}/00-TRANSITION-SLIDE.md`,
    `${LIBRARIES}/01-INTRODUCTION.md`,
    `${LIBRARIES}/02-LIBRARY.md`,
    `${LIBRARIES}/03-NG-PACKAGR.md`,
    `${LIBRARIES}/04-DEPENDENCIES.md`,
  ].map(showByDefault);
}

function nativeFederationSlides() {
  const NATIVE_FEDERATION = '32-NATIVE-FEDERATION';
  return [
    `${NATIVE_FEDERATION}/00-TRANSITION-SLIDE.md`,
    `${NATIVE_FEDERATION}/01-INTRODUCTION.md`,
    `${NATIVE_FEDERATION}/02-SETUP-NATIVE-FEDERATION.md`,
  ].map(showByDefault);
}

function performanceSlides() {
  const PERFORMANCE = '33-PERFORMANCE';
  return [
    `${PERFORMANCE}/00-TRANSITION-SLIDE.md`,
    `${PERFORMANCE}/01-IMAGES.md`,
    `${PERFORMANCE}/02-DEFERRED-VIEWS.md`,
    `${PERFORMANCE}/03-LAZYLOAD-COMPONENT.md`,
  ].map(showByDefault);
}

export function dayFourSlides() {
  return [
    ...unitTestingSlides(),
    ...ngrxSignalStoreSlides(),
    ...changeDetectionZonelessSlides(),
    ...pwaSlides(),
    ...serverSideRenderingSlides(),
    ...librariesSlides(),
    ...nativeFederationSlides(),
    ...performanceSlides(),
  ];
}
