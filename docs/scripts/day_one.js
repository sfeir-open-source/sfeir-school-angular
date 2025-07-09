/** Here is all the slides for day one
 *
 * This school is big on content, it must be a good id to split slides by days
 */

function introductionSlides() {
  return ['presentation/00-WELCOME.md', 'presentation/01-fLOW-SCHOOL.md'];
}

function speakerSlides() {
  return ['speaker/00-nicolas-frizzarin.md'];
}

function basicsSlides() {
  return ['basics/00-TRANSITION-SLIDE.md', 'basics/01-ENVIRONMENT-SETUP.md', 'basics/02-ANGULAR.md', 'basics/03-MATERIAL.md'];
}

function architectureSlides() {
  return [
    'architecture/00-TRANSITION-SLIDE.md',
    'architecture/introduction_schema.md',
    'architecture/component.md',
    'architecture/module.md',
    'architecture/bootstrap_app.md',
    'architecture/module-bundler.md',
    'architecture/exercice.md',
  ];
}

function cliSlides() {
  return ['cli/00-TRANSITION-SLIDE.md', 'cli/commands.md', 'cli/exercice.md'];
}

function componentsSlides() {
  return ['components/00-TRANSITION-SLIDE.md', 'components/concepts.md', 'components/exercice.md'];
}

function dataBindingSLides() {
  return [
    'databinding/00-TRANSITION-SLIDE.md',
    'databinding/introduction.md',
    'databinding/binding.md',
    'databinding/reminder.md',
    'databinding/template_variable.md',
    'databinding/exercice.md',
  ];
}

function lifecycleSlides() {
  return ['lifecycle/00-TRANSITION-SLIDE.md', 'lifecycle/hook_implementation.md'];
}

function eventSlides() {
  return ['event/00-TRANSITION-SLIDE.md', 'event/events.md', 'event/exercice.md'];
}

function serverCommunicationSLides() {
  return [
    'server-communication/00-TRANSITION-SLIDE.md',
    'server-communication/setup.md',
    'server-communication/usage.md',
    'server-communication/exercice.md',
  ];
}

function navigationSlides() {
  return [
    'navigation/00-TRANSITION-SLIDE.md',
    'navigation/introduction.md',
    'navigation/configuration.md',
    'navigation/usage.md',
    'navigation/exercice.md',
  ];
}

function basicsFunctionalitiesSlides() {
  return ['functionalities/00-TRANSITION-SLIDE.md', 'functionalities/loop.md', 'functionalities/exercice.md'];
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
    ...dataBindingSLides(),
    ...lifecycleSlides(),
    ...eventSlides(),
    ...serverCommunicationSLides(),
    ...navigationSlides(),
    ...basicsFunctionalitiesSlides(),
    ...communicationSlides(),
  ];
}
