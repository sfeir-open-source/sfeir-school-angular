import { showByDefault } from './utils.js';

function introductionSlides() {
  const PRESENTATION = '00-PRESENTATION';
  return [`${PRESENTATION}/00-WELCOME.md`, `${PRESENTATION}/01-FLOW-SCHOOL.md`];
}

function speakerSlides() {
  const SPEAKER = '00-SPEAKER';
  return [`${SPEAKER}/00-nicolas-frizzarin.md`];
}

function setupSlides() {
  const SETUP = '01-SETUP';
  return [
    `${SETUP}/00-TRANSITION-SLIDE.md`, //
    `${SETUP}/01-ENVIRONMENT-SETUP.md`, //
    `${SETUP}/02-ANGULAR.md`, //
    `${SETUP}/03-MATERIAL.md`, //
    `${SETUP}/04-CLI-COMMANDS.md`, //
    showByDefault(`${SETUP}/05-UNDER-THE-HOOD.md`), //
  ];
}

function componentsSlides() {
  const COMPONENTS = '02-COMPONENTS';
  return [
    `${COMPONENTS}/00-TRANSITION-SLIDE.md`, //
    `${COMPONENTS}/01-INTRODUCTION-SCHEMA.md`, //
    `${COMPONENTS}/02-COMPONENT.md`, //
    `${COMPONENTS}/03-TEMPLATE-INTERPOLATION.md`, //
    `${COMPONENTS}/04-BOOTSTRAPPING.md`, //
    showByDefault(`${COMPONENTS}/05-NGMODULE-LEGACY.md`), //
    `${COMPONENTS}/100-LAB.md`, //
  ];
}

function componentTreeSlides() {
  const COMPONENT_TREE = '03-COMPONENT-TREE';
  return [
    `${COMPONENT_TREE}/00-TRANSITION-SLIDE.md`, //
    `${COMPONENT_TREE}/01-CONCEPTS.md`, //
    `${COMPONENT_TREE}/100-LAB.md`, //
  ];
}

function reactivityBindingSlides() {
  const REACTIVITY_BINDING = '04-REACTIVITY-BINDING';
  return [
    `${REACTIVITY_BINDING}/00-TRANSITION-SLIDE.md`,
    `${REACTIVITY_BINDING}/01-INTRODUCTION.md`,
    `${REACTIVITY_BINDING}/02-REACTIVITY-CONCEPT.md`,
    `${REACTIVITY_BINDING}/03-BINDING.md`,
    `${REACTIVITY_BINDING}/04-REMINDER.md`,
    `${REACTIVITY_BINDING}/05-ATTRIBUTE-INTERPOLATION.md`,
    `${REACTIVITY_BINDING}/06-NGOPTIMIZEDIMAGE.md`,
    showByDefault(`${REACTIVITY_BINDING}/07-TEMPLATE-VARIABLE.md`),
    `${REACTIVITY_BINDING}/100-LAB.md`,
  ];
}

function eventsSlides() {
  const EVENTS = '05-EVENTS';
  return [`${EVENTS}/00-TRANSITION-SLIDE.md`, `${EVENTS}/01-EVENTS.md`, `${EVENTS}/100-LAB.md`];
}

function lifecycleSlides() {
  // Bonus module: no matching apps/ exercise, so it's trimmed out of the
  // reduced "Modern Angular in 2 days" format entirely.
  const LIFECYCLE = '06-LIFECYCLE';
  return [
    `${LIFECYCLE}/00-TRANSITION-SLIDE.md`, //
    `${LIFECYCLE}/02-HOOK-IMPLEMENTATION.md`, //
    `${LIFECYCLE}/03-HOOK.md`, //
  ].map(showByDefault);
}

function inputOutputSlides() {
  const INPUT_OUTPUT = '07-INPUT-OUTPUT';
  return [`${INPUT_OUTPUT}/00-TRANSITION-SLIDE.md`, `${INPUT_OUTPUT}/01-INPUT.md`, `${INPUT_OUTPUT}/02-OUTPUT.md`, `${INPUT_OUTPUT}/100-LAB.md`];
}

function pipesSlides() {
  const PIPES = '08-PIPES';
  return [
    `${PIPES}/00-TRANSITION-SLIDE.md`, //
    `${PIPES}/01-INTRODUCTION.md`, //
    `${PIPES}/02-DATE-PIPE.md`, //
    `${PIPES}/03-CUSTOM-PIPE.md`, //
    `${PIPES}/100-LAB.md`, //
  ];
}

function dependencyInjectionSlides() {
  const DEPENDENCY_INJECTION = '09-DEPENDENCY-INJECTION';
  return [
    `${DEPENDENCY_INJECTION}/00-TRANSITION-SLIDE.md`,
    `${DEPENDENCY_INJECTION}/01-WHY-A-SERVICE.md`,
    `${DEPENDENCY_INJECTION}/02-SERVICE-DECORATOR.md`,
    showByDefault(`${DEPENDENCY_INJECTION}/03-ADVANCED-SERVICE.md`),
    showByDefault(`${DEPENDENCY_INJECTION}/04-DI-CONCEPTS.md`),
    showByDefault(`${DEPENDENCY_INJECTION}/05-DI-RESOLUTION.md`),
    `${DEPENDENCY_INJECTION}/100-LAB.md`,
  ];
}

function directivesSlides() {
  const DIRECTIVES = '10-DIRECTIVES';
  return [
    `${DIRECTIVES}/00-TRANSITION-SLIDE.md`,
    `${DIRECTIVES}/01-MOTIVATION.md`,
    `${DIRECTIVES}/02-CONCEPTS.md`,
    `${DIRECTIVES}/03-INPUT-ALIAS.md`,
    `${DIRECTIVES}/04-HOST-BINDINGS.md`,
    showByDefault(`${DIRECTIVES}/05-LEGACY-DIRECTIVE-API.md`),
    `${DIRECTIVES}/100-LAB.md`,
  ];
}

export function dayOneSlides() {
  return [
    ...introductionSlides(),
    ...speakerSlides(),
    ...setupSlides(),
    ...componentsSlides(),
    ...componentTreeSlides(),
    ...reactivityBindingSlides(),
    ...eventsSlides(),
    ...lifecycleSlides(),
    ...inputOutputSlides(),
    ...pipesSlides(),
    ...dependencyInjectionSlides(),
    ...directivesSlides(),
  ];
}
