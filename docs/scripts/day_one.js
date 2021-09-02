/** Here is all the slides for day one
 *
 * This school is big on content, it must be a good id to split slides by days
 */

function introductionSlides() {
  return ['presentation/welcome_school.md', 'presentation/flow_school.md'];
}

function speakerSlides() {
  return ['speaker/nicolas_frizzarin.md', 'speaker/bruno_bellenoue.md', 'speaker/anthony_pena.md'];
}

function basicsSlides() {
  return ['basics/transition_slide.md', 'basics/environment_setup.md', 'basics/angular.md', 'basics/material.md'];
}

function architectureSlides() {
  return [
    'architecture/transition_slide.md',
    'architecture/introduction_schema.md',
    'architecture/component.md',
    'architecture/module.md',
    'architecture/bootstrap_app.md',
    'architecture/webpack.md',
    'architecture/exercice.md',
  ];
}

function cliSlides() {
  return ['cli/transition_slide.md', 'cli/commands.md', 'cli/exercice.md'];
}

function dataBindingSLides() {
  return [
    'databinding/transition_slide.md',
    'databinding/introduction.md',
    'databinding/binding.md',
    'databinding/reminder.md',
    'databinding/template_variable.md',
    'databinding/exercice.md',
  ];
}

function componentsSlides() {
  return ['components/transition_slide.md', 'components/concepts.md', 'components/exercice.md'];
}

function lifecycleSlides() {
  return ['lifecycle/transition_slide.md', 'lifecycle/hook_implementation.md'];
}

function eventSlides() {
  return ['event/transition_slide.md', 'event/events.md', 'event/exercice.md'];
}

function serverCommunicationSLides() {
  return [
    'server-communication/transition_slide.md',
    'server-communication/setup.md',
    'server-communication/usage.md',
    'server-communication/exercice.md',
  ];
}

function navigationSlides() {
  return [
    'navigation/transition_slide.md',
    'navigation/introduction.md',
    'navigation/configuration.md',
    'navigation/usage.md',
    'navigation/exercice.md',
  ];
}

function basicsFunctionnalitiesSlides() {
  return ['functionalities/transition_slide.md', 'functionalities/loop.md', 'functionalities/exercice.md'];
}

function communicationSlides() {
  return [
    'component-communication/transition_slide.md',
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
    ...basicsFunctionnalitiesSlides(),
    ...communicationSlides(),
  ];
}
