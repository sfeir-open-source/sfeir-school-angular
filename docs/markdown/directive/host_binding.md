<!-- .slide: class="transition-bg-grey-1 underline" -->
# Host Binding

##==##

<!-- .slide -->
# Host binding définition
<br><br>

- Permet de setter une proprité sur l'élement courant de la directive<br><br>
- Décorateur @HostBinding()<br><br>
- Watcher sur les propriété du host et mise à jour automatique

##==##

<!-- .slide: class="inconsolata with-code" -->
# Host binding exemple
<br><br>

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
- ici set la propriété class à valid si le control est valide ou invalid si le control est invalid
