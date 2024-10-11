function standaloneComponents() {
  return [
    'standalone-components/transition_slide.md',
    'standalone-components/introduction.md',
    'standalone-components/routing.md',
    'standalone-components/injector.md',
    'standalone-components/exercice.md',
  ];
}

function signals() {
  return ['signals/transition_slide.md', 'signals/introduction.md', 'signals/signals.md', 'signals/binding_queries.md', 'signals/exercice.md'];
}

function deferredViews() {
  return ['deferred-views/transition_slide.md', 'deferred-views/deferred-views.md'];
}

function controlFlow() {
  return ['control-flow/transition_slide.md', 'control-flow/conditional_flow.md'];
}

export function dayFiveSlide() {
  return [...standaloneComponents(), ...controlFlow(), ...signals(), ...deferredViews()];
}
