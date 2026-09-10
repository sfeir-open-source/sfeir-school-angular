import { showByDefault } from './utils.js';

/** Here is all the slides for day two
 *
 * Day 2 follows the staff-directory app's own story, exercise by exercise:
 * routing (09-router) turns "one hardcoded screen" into a real, URL-driven
 * app; control flow (10-control-flow) brings the people list to life with
 * @if/@for/@switch; HTTP (11-http) swaps the mock array for a real REST API,
 * introducing httpResource, toSignal and merge/switchMap composition; the
 * three forms modules (12/13/14-*-form) build the exact same "add/edit
 * person" dialog three times — template-driven, reactive, then Signal Forms
 * — so the summary module's side-by-side comparison actually lands; and
 * reactive-thinking (15-reactive-thinking) closes the day by wiring routing,
 * resources, linkedSignal and forms together into a real detail/edit page.
 */

function routerBasicsSlides() {
  const ROUTER = '11-ROUTER-BASICS';
  return [
    `${ROUTER}/00-TRANSITION-SLIDE.md`,
    `${ROUTER}/01-INTRODUCTION.md`,
    `${ROUTER}/02-ROUTES-CONFIGURATION.md`,
    `${ROUTER}/03-PROVIDE-ROUTER.md`,
    `${ROUTER}/100-LAB.md`,
  ].map(showByDefault);
}

function controlFlowSlides() {
  const CONTROL_FLOW = '12-CONTROL-FLOW';
  return [
    `${CONTROL_FLOW}/00-TRANSITION-SLIDE.md`,
    `${CONTROL_FLOW}/01-INTRODUCTION.md`,
    `${CONTROL_FLOW}/02-if.md`,
    `${CONTROL_FLOW}/03-for.md`,
    `${CONTROL_FLOW}/04-switch.md`,
    `${CONTROL_FLOW}/100-LAB.md`,
    `${CONTROL_FLOW}/05-migration.md`,
  ];
}

function httpSlides() {
  const HTTP = '13-HTTP';
  return [
    `${HTTP}/00-TRANSITION-SLIDE.md`,
    `${HTTP}/01-SETUP.md`,
    `${HTTP}/02-USAGE.md`,
    `${HTTP}/03-HTTP-RESOURCE.md`,
    `${HTTP}/04-BRIDGE-OBSERVABLE-SIGNALS.md`,
    `${HTTP}/100-LAB.md`,
  ].map(showByDefault);
}

function templateDrivenFormSlides() {
  const FORMS = '14-FORMS-TEMPLATE-DRIVEN';
  return [
    `${FORMS}/00-TRANSITION-SLIDE.md`,
    `${FORMS}/01-INTRODUCTION.md`,
    `${FORMS}/02-VALIDATION.md`,
    `${FORMS}/100-LAB.md`,
  ];
}

function reactiveFormSlides() {
  const FORMS = '15-FORMS-REACTIVE';
  return [
    `${FORMS}/01-INTRODUCTION.md`,
    `${FORMS}/02-VALIDATION.md`,
    `${FORMS}/03-CUSTOM-VALIDATION.md`,
    `${FORMS}/04-CUSTOM-CONTROL.md`,
    `${FORMS}/100-LAB.md`,
  ];
}

function signalFormSlides() {
  const FORMS = '16-FORMS-SIGNAL';
  return [
    `${FORMS}/00-TRANSITION-SLIDE.md`,
    `${FORMS}/01-INTRODUCTION.md`,
    `${FORMS}/02-GETTING-STARTED.md`,
    `${FORMS}/03-FIELD-STATE.md`,
    `${FORMS}/04-VALIDATION.md`,
    `${FORMS}/05-CUSTOM-VALIDATION.md`,
    `${FORMS}/06-LOGIC.md`,
    `${FORMS}/07-SCHEMAS.md`,
    `${FORMS}/08-ASYNC.md`,
    `${FORMS}/09-SUBMIT.md`,
    `${FORMS}/10-CUSTOM-CONTROLS.md`,
    `${FORMS}/100-LAB.md`,
    `${FORMS}/11-BEST-PRACTICES.md`,
  ].map(showByDefault);
}

function formsSummarySlides() {
  const SUMMARY = '17-FORMS-SUMMARY';
  // Bonus/comparison module, no lab — shown on-stage; kept out of the
  // reduced modern-2days format the same way other bonus content is.
  return [showByDefault(`${SUMMARY}/01-SUMMARY.md`)];
}

function reactiveThinkingSlides() {
  const REACTIVE_THINKING = '18-REACTIVE-THINKING';
  return [
    `${REACTIVE_THINKING}/00-TRANSITION-SLIDE.md`,
    `${REACTIVE_THINKING}/01-INTRODUCTION.md`,
    `${REACTIVE_THINKING}/02-ROUTER-LINK.md`,
    `${REACTIVE_THINKING}/03-COMPONENT-INPUT-BINDING.md`,
    `${REACTIVE_THINKING}/04-RX-RESOURCE.md`,
    `${REACTIVE_THINKING}/05-LINKED-SIGNAL.md`,
    `${REACTIVE_THINKING}/06-COMPLETING-THE-CRUD.md`,
    `${REACTIVE_THINKING}/100-LAB.md`,
  ].map(showByDefault);
}

export function dayTwoSlides() {
  return [
    ...routerBasicsSlides(),
    ...controlFlowSlides(),
    ...httpSlides(),
    ...templateDrivenFormSlides(),
    ...reactiveFormSlides(),
    ...signalFormSlides(),
    ...formsSummarySlides(),
    ...reactiveThinkingSlides(),
  ];
}
