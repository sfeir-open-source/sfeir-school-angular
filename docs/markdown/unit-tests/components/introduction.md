<!-- .slide: class="transition-bg-sfeir-2" -->

# Tester ses composants

##==##

<!-- .slide-->
# Qu'implique réellement les tests?

-   "la magie" d'instance d'Angular ne se fait plus totalement<br/><br/>
-   Il faut mocker ses services et les données qu'utilisent nos composants<br/><br/>
-   J'ai 100% de code coverage ne signifie pas que vos tests sont corrects<br/><br/>
-   Garder à l'esprit que tester ce n'est pas douter, mais rendre un projet/une application de qualité<br/><br/>

##==##

<!-- .slide: class="with-code inconsolata" -->
# Le Setup des tests du composant

```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [UserProfileComponent]
  });
  const fixture = TestBed.createComponent(UserProfileComponent);
  const instance = fixture.componentInstance;
  const element = fixture.nativeElement;
  const debug = fixture.debugElement;
  fixture.detectChanges();
});
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Détails sur les fonctions utilisées

- **TestBed**
  - **TestBed.createComponent** : crée une instance du composant (fixture)
  - **TestBed.overrideComponent** : surcharge une instance d'un composant<br/><br/>
- **ComponentFixture**
  - **fixture.componentInstance** : accès à l’instance du composant
  - **fixture.nativeElement** : accès au DOM du composant
  - **fixture.debugElement** : fonction helper
  - **fixture.detectChanges** : déclenche la détection du changement

##==##

<!-- .slide: class="with-code" -->
# Et si mon composant utilise d'autres composants ?

Mais si je dois tout mocker **ça risque d'être long** si mon composant utilise une dizaine de composant enfant !!<br/><br/>

<span class="important">Et bien non il existe une astuce : masquer les erreurs liées aux composants imbriqués! :) grâce à **NO_ERRORS_SCHEMA**</span>

```typescript
import { NO_ERRORS_SCHEMA } from '@angular/core';
beforeEach(() => {

  TestBed.configureTestingModule({
    declarations: [ ... ],
    schemas: [ NO_ERRORS_SCHEMA ]
  });
});
```
<!-- .element: class="medium-code" -->
