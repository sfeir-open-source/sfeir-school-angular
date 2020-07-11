<!-- .slide: class="transition-bg-grey-1 underline" -->
# Tester ses composants

##==##

<!-- .slide-->
# Qu'implique réellement les tests?
<br><br><br>

- "la magie" d'instance d'Angular ne se fait plus totalement<br><br>
- Il faut mocker ses services et les données qu'utilisent nos composants<br><br>
- J'ai 100% de code coverage ne signifie pas que vos tests sont corrects<br><br>
- Garder à l'esprit que tester ce n'est pas douter, mais rendre un projet/une application de qualité<br><br>

##==##

<!-- .slide: class="with-code inconsolata" -->
# Le Setup des tests du composant
<br><br><br>

```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [ UserProfileComponent ]
  });
  const fixture = TestBed.createComponent(UserProfileComponent);
  const instance = fixture.componentInstance;
  const element = fixture.nativeElement;
  const debug   = fixture.debugElement;
  fixture.detectChanges();
});
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Détails sur les fonctions utilisées
<br>

- __TestBed__
    - __TestBed.createComponent__: crée une instance du composant (fixture)
    - __TestBed.overrideComponent __: surcharge une instance d'un composant
<br><br>

- __ComponentFixture__
    - __fixture.componentInstance__ : accès à l’instance du composant
    - __fixture.nativeElement__ : accès au DOM du composant
    - __fixture.debugElement__ : fonction helper
    - __fixture.detectChanges__ : déclenche la détection du changement

##==##

<!-- .slide: class="with-code" -->
# Et si mon composant utilise d'autre composant ?
<br>

Mais si je dois tous mocker __ça risque d'être long__ si mon composant utilise une dizaine de composant enfant !!<br><br>
<span class="important">Et bien non il existe une astuce: masquer les erreurs liées aux compoants imbriqués! :) grâce à __NO_ERRORS_SCHEMA__</span>
<br><br>

```typescript
import { NO_ERRORS_SCHEMA } from '@angular/core';
beforeEach(() => {

  TestBed.configureTestingModule({
    declarations: [ ... ],
    schemas: [ NO_ERRORS_SCHEMA ]
  });
});
```
<!-- .element: class="big-code" -->
