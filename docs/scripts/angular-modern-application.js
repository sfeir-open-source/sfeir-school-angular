function introduction() {
  return ['standalone-components/angular-modern-application.md', 'speaker/nicolas_frizzarin.md', 'presentation/flow_school.md'];
}

function summary() {
  return [
    'architecture/transition_slide.md',
    'architecture/introduction_schema.md',
    'architecture/component.md',
    'architecture/module.md',
    'architecture/bootstrap_app.md',
    'architecture/module-bundler.md',
  ];
}

function standaloneComponents() {
  return [
    'standalone-components/transition_slide.md',
    'standalone-components/introduction.md',
    'standalone-components/injector.md',
    'standalone-components/routing.md',
  ];
}

function guards() {
  return ['navigation/guards_introduction.md', 'navigation/guards_verification.md', 'navigation/guards_resolver.md'];
}

function interceptorsSlides() {
  return [
    'interceptors/concepts.md',
    'interceptors/modification.md',
    'interceptors/register.md',
    'interceptors/context.md',
    'standalone-components/exercice.md',
  ];
}

function signals() {
  return ['signals/transition_slide.md', 'signals/introduction.md', 'signals/signals.md', 'signals/exercice.md'];
}

export function AngularModernApplication() {
  return [...introduction(), ...summary(), ...standaloneComponents(), ...guards(), ...interceptorsSlides(), ...signals()];
}
