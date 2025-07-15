/** Here is all the slides for day one
 *
 * This school is big on content, it must be a good id to split slides by days
 */

function introductionSlides() {
  const PRESENTATION = 'presentation';
  return [`${PRESENTATION}/00-WELCOME.md`, `${PRESENTATION}/01-fLOW-SCHOOL.md`];
}

function speakerSlides() {
  const SPEAKER = 'speaker';
  return [`${SPEAKER}/00-nicolas-frizzarin.md`];
}

function basicsSlides() {
  const BASICS = 'basics';
  return [`${BASICS}/00-TRANSITION-SLIDE.md`, `${BASICS}/01-ENVIRONMENT-SETUP.md`, `${BASICS}/02-ANGULAR.md`, `${BASICS}/03-MATERIAL.md`];
}

function architectureSlides() {
  const ARCHITECTURE = 'architecture';
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
  const CLI = 'cli';
  return [`${CLI}/00-TRANSITION-SLIDE.md`, `${CLI}/01-COMMANDS.md`, `${CLI}/100-LAB.md`];
}

function componentsSlides() {
  const COMPONENTS = 'components';
  return [`${COMPONENTS}/00-TRANSITION-SLIDE.md`, `${COMPONENTS}/01-CONCEPTS.md`, `${COMPONENTS}/100-LAB.md`];
}

function dataBindingSlides() {
  const DATA_BINDING = 'databinding';
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
  return ['lifecycle/00-TRANSITION-SLIDE.md', 'lifecycle/hook_implementation.md'];
}

function eventSlides() {
  return ['event/00-TRANSITION-SLIDE.md', 'event/events.md', 'event/100-LAB.md'];
}

function serverCommunicationSLides() {
  return [
    'server-communication/00-TRANSITION-SLIDE.md',
    'server-communication/setup.md',
    'server-communication/usage.md',
    'server-communication/100-LAB.md',
  ];
}

function navigationSlides() {
  return [
    'navigation/00-TRANSITION-SLIDE.md',
    'navigation/01-INTRODUCTION.md',
    'navigation/configuration.md',
    'navigation/usage.md',
    'navigation/100-LAB.md',
  ];
}

function basicsFunctionalitiesSlides() {
  return ['functionalities/00-TRANSITION-SLIDE.md', 'functionalities/loop.md', 'functionalities/100-LAB.md'];
}

function communicationSlides() {
  return [
    'component-communication/00-TRANSITION-SLIDE.md',
    'component-communication/input.md',
    'component-communication/exercice_input.md',
    'component-communication/output.md',
    'component-communication/exercice_output.md',
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
    ...lifecycleSlides(),
    ...eventSlides(),
    ...serverCommunicationSLides(),
    ...navigationSlides(),
    ...basicsFunctionalitiesSlides(),
    ...communicationSlides(),
  ];
}
