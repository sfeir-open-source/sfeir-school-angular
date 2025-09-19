/** Here is all the slides for day one
 *
 * This school is big on content, it must be a good id to split slides by days
 */

function introductionSlides() {
  const PRESENTATION = '00-PRESENTATION';
  return [`${PRESENTATION}/00-WELCOME.md`, `${PRESENTATION}/01-fLOW-SCHOOL.md`];
}

function speakerSlides() {
  const SPEAKER = '00-SPEAKER';
  return [`${SPEAKER}/00-nicolas-frizzarin.md`];
}

function basicsSlides() {
  const BASICS = '01-BASICS';
  return [`${BASICS}/00-TRANSITION-SLIDE.md`, `${BASICS}/01-ENVIRONMENT-SETUP.md`, `${BASICS}/02-ANGULAR.md`, `${BASICS}/03-MATERIAL.md`];
}

function architectureSlides() {
  const ARCHITECTURE = '02-ARCHITECTURE';
  return [
    `${ARCHITECTURE}/00-TRANSITION-SLIDE.md`,
    `${ARCHITECTURE}/01-INTRODUCTION-SCHEMA.md`,
    `${ARCHITECTURE}/02-COMPONENT.md`,
    `${ARCHITECTURE}/04-MODULE.md`,
    `${ARCHITECTURE}/05-BOOTSTRAPPING.md`,
    `${ARCHITECTURE}/06-MODULE-BUNDLER.md`,
    `${ARCHITECTURE}/100-LAB.md`,
  ];
}

function cliSlides() {
  const CLI = '03-CLI';
  return [`${CLI}/00-TRANSITION-SLIDE.md`, `${CLI}/01-COMMANDS.md`, `${CLI}/100-LAB.md`];
}

function componentsSlides() {
  const COMPONENTS = '04-COMPONENTS';
  return [`${COMPONENTS}/00-TRANSITION-SLIDE.md`, `${COMPONENTS}/01-CONCEPTS.md`, `${COMPONENTS}/100-LAB.md`];
}

function dataBindingSlides() {
  const DATA_BINDING = '05-DATA-BINDING';
  return [
    `${DATA_BINDING}/00-TRANSITION-SLIDE.md`,
    `${DATA_BINDING}/01-INTRODUCTION.md`,
    `${DATA_BINDING}/02-REACTIVITY-CONCEPT.md`,
    `${DATA_BINDING}/03-BINDING.md`,
    `${DATA_BINDING}/04-REMINDER.md`,
    `${DATA_BINDING}/05-TEMPLATE-VARIABLE.md`,
    `${DATA_BINDING}/100-LAB.md`,
  ];
}

function lifecycleSlides() {
  const LIFECYCLE = '06-LIFECYCLE';
  return [`${LIFECYCLE}/00-TRANSITION-SLIDE.md`, `${LIFECYCLE}/02-HOOK-IMPLEMENTATION.md`, `${LIFECYCLE}/03-HOOK.md`];
}

function eventSlides() {
  const EVENT = '07-EVENT';
  return [`${EVENT}/00-TRANSITION-SLIDE.md`, `${EVENT}/02-EVENTS.md`, `${EVENT}/100-LAB.md`];
}

function serverCommunicationSlides() {
  const SERVER_COMMUNICATION = '08-SERVER-COMMUNICATION';

  return [
    `${SERVER_COMMUNICATION}/00-TRANSITION-SLIDE.md`,
    `${SERVER_COMMUNICATION}/01-SETUP.md`,
    `${SERVER_COMMUNICATION}/02-USAGE.md`,
    `${SERVER_COMMUNICATION}/03-BRIDGE-OBSERVABLE-SIGNALS.md`,
    `${SERVER_COMMUNICATION}/04-SIGNAL-SERVER-COMMUNICATION.md`,
    `${SERVER_COMMUNICATION}/100-LAB.md`,
  ];
}

function navigationSlides() {
  const NAVIGATION = '09-NAVIGATION';
  return [
    `${NAVIGATION}/00-TRANSITION-SLIDE.md`,
    `${NAVIGATION}/01-INTRODUCTION.md`,
    `${NAVIGATION}/02-CONFIGURATION.md`,
    `${NAVIGATION}/03-USAGE.md`,
    `${NAVIGATION}/100-LAB.md`,
  ];
}

function basicsFunctionalitiesSlides() {
  const FUNCTIONALITIES = '10-FUNCTIONALITIES';
  return [`${FUNCTIONALITIES}/00-TRANSITION-SLIDE.md`, `${FUNCTIONALITIES}/01-LOOP.md`, `${FUNCTIONALITIES}/100-LAB.md`];
}

function communicationSlides() {
  const COMPONENT_COMMUNICATION = '11-COMPONENT-COMMUNICATION';

  return [
    `${COMPONENT_COMMUNICATION}/00-TRANSITION-SLIDE.md`,
    `${COMPONENT_COMMUNICATION}/01-INPUT.md`,
    `${COMPONENT_COMMUNICATION}/100-LAB.md`,
    `${COMPONENT_COMMUNICATION}/02-OUTPUT.md`,
    `${COMPONENT_COMMUNICATION}/101-LAB.md`,
  ];
}

export function dayOneSlides() {
  return [
    ...introductionSlides(),
    ...speakerSlides(),
    ...basicsSlides(),
    ...architectureSlides(),
    ...cliSlides(),
    ...componentsSlides(),
    ...dataBindingSlides(),
    ...eventSlides(),
    ...lifecycleSlides(),
    ...serverCommunicationSlides(),
    ...navigationSlides(),
    ...basicsFunctionalitiesSlides(),
    ...communicationSlides(),
  ];
}
