function introduction() {
  return ['standalone-components/angular-modern-application.md', 'speaker/00-nicolas-frizzarin.md', 'presentation/01-fLOW-SCHOOL.md'];
}

function summary() {
  return [
    'architecture/00-TRANSITION-SLIDE.md',
    'architecture/01-INTRODUCTION-SCHEMA.md',
    'architecture/02-COMPONENT.md',
    'architecture/04-MODULE.md',
    'architecture/05-BOOTSTRAPPING.md',
    'architecture/06-MODULE-BUNDLER.md',
  ];
}

function standaloneComponents() {
  return [
    'standalone-components/00-TRANSITION-SLIDE.md',
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
    'standalone-components/100-LAB.md',
  ];
}

function signals() {
  return ['signals/00-TRANSITION-SLIDE.md', 'signals/introduction.md', 'signals/signals.md', 'signals/100-LAB.md'];
}

export function AngularModernApplication() {
  return [...introduction(), ...summary(), ...standaloneComponents(), ...guards(), ...interceptorsSlides(), ...signals()];
}
