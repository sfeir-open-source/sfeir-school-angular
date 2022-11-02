<!-- .slide: class="transition-bg-grey-1 underline" -->
# Tester vos directives

##==##

<!-- .slide: class="with-code inconsolata" -->
# Le Setup

- __Même API que pour les composants__: TestBed, ComponentFixture..<br><br>
- Nécessite la création d'un composant de test pour accueillir la directive<br><br>

```typescript
@Component({
  selector: 'test-my-directive',
  template: ``
})
export class HostComponentForDirective {}
```
<!-- .element: class="big-code" -->
Notes:
- Un composant étant une directive mais avec une vue il est normal qu'il utilise la même API que les composants
- Une directive se place toujours sur un élement html présent dans la vue du composant. Il est donc nécessaire de créer un composant "tampon" qui va hoster notre directive à tester

##==##

<!-- .slide: class="with-code inconsolata" -->
# Initialisation du HostComponent

```typescript
TestBed
  .overrideComponent(HostComponentForDirective, {
    set: {
      template: `<div my-directive></div>`
    }
  })
  .createComponent(HostComponentForDirective);
```
<!-- .element: class="big-code" -->
Notes:
- Une fois l'initialisation, il ne reste plus qu'a tester notre directive
