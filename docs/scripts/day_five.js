function standaloneComponents() {
  return [
    'standalone-components/00-TRANSITION-SLIDE.md',
    'standalone-components/01-INTRODUCTION.md',
    'standalone-components/routing.md',
    'standalone-components/injector.md',
    'standalone-components/100-LAB.md',
  ];
}

function signals() {
  return ['signals/00-TRANSITION-SLIDE.md', 'signals/01-INTRODUCTION.md', 'signals/signals.md', 'signals/binding_queries.md', 'signals/100-LAB.md'];
}

function deferredViews() {
  return ['deferred-views/00-TRANSITION-SLIDE.md', 'deferred-views/deferred-views.md'];
}

function controlFlow() {
  return ['control-flow/00-TRANSITION-SLIDE.md', 'control-flow/conditional_flow.md'];
}

export function dayFiveSlide() {
  return [...standaloneComponents(), ...controlFlow(), ...signals(), ...deferredViews()];
}
