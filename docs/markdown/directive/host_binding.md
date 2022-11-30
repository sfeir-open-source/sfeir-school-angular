<!-- .slide: class="transition-bg-sfeir-2" -->
# Host Binding

##==##

<!-- .slide -->
# Host binding: Définition

- Permet de setter une propriété sur l'élément courant de la directive<br/><br/>
- Décorateur @HostBinding()<br/><br/>
- Watcher sur les propriétés du host et mise à jour automatique

##==##

<!-- .slide: class="inconsolata with-code" -->
# Host binding: Exemple

```typescript
@Directive({selector: '[ngModel]'})
class NgModelStatus {
  constructor(public control: NgModel) {}
  @HostBinding('class.valid') get valid() { return this.control.valid; }
  @HostBinding('class.invalid') get invalid() { return this.control.invalid; }
}
```
<!-- .element: class="big-code" -->
Notes:
- ici set la propriété class à valid si le control est valide ou invalid si le control est invalide
