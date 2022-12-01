<!-- .slide: class="with-code inconsolata" -->
# Enregistrer son composant dans le service NG_VALUE_ACCESSOR

-   NG_VALUE_ACCESSOR est un service global donnée par @angular/forms
  <br/><br/>

```typescript
@Component({
  selector: 'sfeir-dropdown',
  templateUrl: 'sfeir-dropdown.component.html',
  stylesUrl: [ 'sfeir-dropdown.component.css' ]
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SfeirDropDownComponent), multi: true }]
})
```

<!-- .element: class="big-code" -->

<br/><br/>
Ouhlà!! D'où sort tout ça ?

<!-- .element: class="center important" -->
<br/>
Notes:
- Ici on pousse le component SfeirDropDownComponent dans le provider NG_VALUE_ACCESSOR grâce à provide: NG_VALUE_ACCESSOR
- multi: true permet de préciser qu'il peut y avoir plusieurs composants qui vont utiliser NG_VALUE_ACCESSOR
##==##

<!-- .slide: class="inconsolata with-code" -->

# Pourquoi utiliser forwardRef ?

-   Fait référence à quelque chose qui n'est pas définie
    <br/><br/><br/>

Heu ça veut dire que la class SfeirDropDownComponent n'est pas définie ?

<!-- .element: class="center important"-->
<br/>
Et bien non ! Les classes ne sont pas au 'top' du runtime JS, ce qui insinue que dans les métadata du décorateur @Component, la classe n'est pas définie.

Notes:

-   https://www.ecma-international.org/ecma-262/10.0/index.html#sec-ecmascript-language-functions-and-classes

##==##

<!-- .slide -->

# Implémenter l'interface ControlValueAccessor

-   Permet de préciser à Angular comment accéder à la valeur du contrôle
-   'Pont' entre le contrôle et l'élement natif (ici l'élement sfeir-dropdown)
-   Doit obligatoirement implémenter les méthodes suivantes:
-   writeValue
-   registerOnChange
-   registerOnTouched
-   setDisableState (optionnel)

##==##

<!-- .slide: class="sfeir-basic-slide" -->

# WriteValue: modèle -> vue

-  Ecrit une valeur dans l'élément. Cette méthode est appelée :
  -   lors de l'instanciation d'un nouveau FormControl
  -   quand on appelle la méthode patchValue/setValue

##==##

<!-- .slide: class="with-code inconsolata" -->

# registerOnChange: vue -> modèle

Définit une fonction ou callback à appeler quand il y a un changement dans votre composant

```typescript
@Component({
  selector: 'msfeir-dropdown',
  templateUrl: 'sfeir-dropdown.component.html',
  stylesUrl: [ 'sfeir-dropdown.component.css' ]
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SfeirDropDownComponent), multi: true }]
})
export class SfeirDropDownComponent implements ControlValueAccessor {
  private onChange: () => void;
  writeValue() { }
  registerOnChange(fn: () => void ) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) { }
}
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# registerOnTouched: vue -> modèle

Définit une fonction ou callback à appeler quand votre composant a été 'touched''

```typescript
@Component({
  selector: 'msfeir-dropdown',
  templateUrl: 'sfeir-dropdown.component.html',
  stylesUrl: [ 'sfeir-dropdown.component.css' ]
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SfeirDropDownComponent), multi: true }]
})
export class SfeirDropDownComponent implements ControlValueAccessor {
  private onChange: () => void;
  private onTouched: () => void;
  writeValue() { }
  registerOnChange(fn: () => void ) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
}
```

<!-- .element: class="medium-code" -->
