import { showByDefault } from './utils.js';

/** Here is all the slides for day three
 *
 * Day 3 follows the Staff Directory as it grows a real navigation and data
 * layer: routes get lazy-loaded and feature-owned (16-advanced-routing),
 * gated behind a login flow (17-guards), fed data before they even activate
 * (18-resolver), and authenticated on every outgoing HTTP call
 * (19-interceptors). It then turns to the templating toolbox that makes
 * shared UI possible: a reusable loading overlay built with content
 * projection (20-ng-content), a generic list built with template outlets
 * (21-teleportation), and finally the deepest exercise of the whole
 * training — a custom structural directive that creates a component
 * imperatively to mask/reveal the phone field (22-structural-directive).
 */

function advancedRoutingSlides() {
  const ADVANCED_ROUTING = '19-ADVANCED-ROUTING';
  return [
    showByDefault(`${ADVANCED_ROUTING}/ANGULAR-300.md`),
    `${ADVANCED_ROUTING}/00-TRANSITION-SLIDE.md`,
    `${ADVANCED_ROUTING}/01-LAZY-LOADING-PRINCIPLES.md`,
    `${ADVANCED_ROUTING}/02-LAZY-LOADING-ROUTE-DEFINITION.md`,
    `${ADVANCED_ROUTING}/03-CHILD-ROUTES.md`,
    `${ADVANCED_ROUTING}/100-LAB.md`,
  ];
}

function guardsSlides() {
  const GUARDS = '20-GUARDS';
  return [
    `${GUARDS}/00-TRANSITION-SLIDE.md`,
    `${GUARDS}/01-INTRODUCTION.md`,
    `${GUARDS}/02-FUNCTIONAL-GUARDS.md`,
    `${GUARDS}/03-REDIRECTS.md`,
    `${GUARDS}/04-GUARD-TYPES.md`,
    `${GUARDS}/100-LAB.md`,
  ];
}

function resolversSlides() {
  const RESOLVERS = '21-RESOLVERS';
  return [
    `${RESOLVERS}/00-TRANSITION-SLIDE.md`,
    `${RESOLVERS}/01-CONCEPTS.md`,
    `${RESOLVERS}/02-WRITING-A-RESOLVER.md`,
    `${RESOLVERS}/03-COMPONENT-INPUT-BINDING.md`,
    `${RESOLVERS}/04-VS-RESOURCE.md`,
    `${RESOLVERS}/100-LAB.md`,
  ];
}

function interceptorsSlides() {
  const INTERCEPTORS = '22-INTERCEPTORS';
  return [
    `${INTERCEPTORS}/00-TRANSITION-SLIDE.md`,
    `${INTERCEPTORS}/01-CONCEPTS.md`,
    `${INTERCEPTORS}/02-MODIFYING-REQUESTS.md`,
    `${INTERCEPTORS}/03-REGISTERING.md`,
    showByDefault(`${INTERCEPTORS}/04-CONTEXT.md`),
    `${INTERCEPTORS}/05-AUTH-LOOP.md`,
    `${INTERCEPTORS}/100-LAB.md`,
  ];
}

function contentProjectionSlides() {
  const CONTENT_PROJECTION = '23-CONTENT-PROJECTION';
  return [
    `${CONTENT_PROJECTION}/00-TRANSITION-SLIDE.md`,
    `${CONTENT_PROJECTION}/01-NG-CONTENT.md`,
    `${CONTENT_PROJECTION}/02-TRANSPARENT-WRAPPER.md`,
    `${CONTENT_PROJECTION}/03-SIGNAL-INPUTS-BOOLEAN.md`,
    `${CONTENT_PROJECTION}/04-LOADING-STATE-PATTERNS.md`,
    `${CONTENT_PROJECTION}/100-LAB.md`,
  ].map(showByDefault);
}

function templateOutletSlides() {
  const TEMPLATE_OUTLET = '24-TEMPLATE-OUTLET';
  return [
    `${TEMPLATE_OUTLET}/00-TRANSITION-SLIDE.md`,
    `${TEMPLATE_OUTLET}/01-NG-TEMPLATE.md`,
    `${TEMPLATE_OUTLET}/02-NG-CONTAINER-AND-OUTLET.md`,
    `${TEMPLATE_OUTLET}/03-CONTENT-QUERIES-AND-GENERICS.md`,
    `${TEMPLATE_OUTLET}/04-CALLER-SIDE.md`,
    `${TEMPLATE_OUTLET}/05-VIEW-CHILD-REFERENCE.md`,
    `${TEMPLATE_OUTLET}/100-LAB.md`,
  ].map(showByDefault);
}

function structuralDirectivesAdvancedSlides() {
  const STRUCTURAL_DIRECTIVES_ADVANCED = '25-STRUCTURAL-DIRECTIVES-ADVANCED';
  return [
    showByDefault(`${STRUCTURAL_DIRECTIVES_ADVANCED}/ANGULAR-400.md`),
    `${STRUCTURAL_DIRECTIVES_ADVANCED}/00-TRANSITION-SLIDE.md`,
    `${STRUCTURAL_DIRECTIVES_ADVANCED}/01-STRUCTURAL-SYNTAX.md`,
    `${STRUCTURAL_DIRECTIVES_ADVANCED}/02-TEMPLATEREF-VIEWCONTAINERREF.md`,
    `${STRUCTURAL_DIRECTIVES_ADVANCED}/03-CREATE-COMPONENT.md`,
    `${STRUCTURAL_DIRECTIVES_ADVANCED}/04-WIRING-IT-INTO-THE-FORM.md`,
    `${STRUCTURAL_DIRECTIVES_ADVANCED}/100-LAB.md`,
  ].map(showByDefault);
}

export function dayThreeSlides() {
  return [
    ...advancedRoutingSlides(),
    ...guardsSlides(),
    ...resolversSlides(),
    ...interceptorsSlides(),
    ...contentProjectionSlides(),
    ...templateOutletSlides(),
    ...structuralDirectivesAdvancedSlides(),
  ];
}
