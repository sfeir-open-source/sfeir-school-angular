<!-- .slide: class="sfeir-bg-white-5" -->
# Tester vos directives

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Le Setup
<br><br>
<ul>
    <li>__Même API que pour les Composants__ : TestBed, ComponentFixture...</li><br>
    <li>Nécessite la création d’un composant de test pour accueillir la directive</li>
</ul>
```typescript
@Component({
  selector: 'test-my-directive',
  template: ``
})
export class HostComponentForDirective {}
```
<!-- .element: class="big-code" -->
Notes
- Un composant étant une directive mais avec une vue il est normal qu'il utilise la même api que les composants
- Une directive se plasse toujours sur un élement html présent dans la vue du composant. Il est donc nécessaire de créer un composant "tampon" qui va hoster notre directive à tester

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Initialisation du HostComponent
<br><br>
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
Notes
- Une fois l'initialisation, il ne reste plus qu'a tester notre directive
