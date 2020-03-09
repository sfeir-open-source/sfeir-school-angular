<!-- .slide: class="sfeir-basic-slide with-code" -->
# Enregistrer son composant dans le service NG_VALUE_ACCESSOR
<br>
<ul>
    <li>NG_VALUE_ACCESSOR est un service global donnée par @angular/forms</li>
</ul>
<br><br>
```typescript
@Component({
  selector: 'msfeir-dropdown',
  templateUrl: 'sfeir-dropdown.component.html',
  stylesUrl: [ 'sfeir-dropdown.component.css' ]
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SfeirDropDownComponent), multi: true }]  
})
```
<!-- .element: class="big-code" -->
<br><br>
<span class="important center">Ouhla! D'ou sort tout ça ?</span>
Notes:
- Ici on pousse le component SfeirDropDownComponent dans le provider NG_VALUE_ACCESSOR grâce à provide: NG_VALUE_ACCESSOR
- multi: true permet de préciser qu'il peut y avoir plusieurs composant qui vont utiliser NG_VALUE_ACCESSOR
##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->

# Pourquoi utiliser forwardRef ?
<br><br>
<ul>
  <li>Fait référence à quelque chose qui n'est pas définie</li><br>
</ul>
<br>
<span class="center important">Heu ça veut dire que la class SfeirDropDownComponent n'est pas définie ? </span>
<br>
Et bien non ! Les classes ne sont pas au 'top' du runtime JS, ce qui insinue que dans les métadatas de l'annotation @Component, la classe n'est pas définie

Notes: 
- https://www.ecma-international.org/ecma-262/10.0/index.html#sec-ecmascript-language-functions-and-classes

##==##

<!-- .slide: class="sfeir-basic-slide" -->

# Implémenter l'interface ControlValueAccessor
<br><br>
- Permet de préciser à Angular comment accéder au 'control' value
- 'Pont' entre le contrôle et l'élement natif (ici l'élement sfeir-dropdown)
- Doit obligatoirement implémenter les méthodes suivante:
 - writeValue
 - registerOnChange
 - registerOnTouched
 - setDisableState (optionnel)

##==##

<!-- .slide: class="sfeir-basic-slide" -->

# WriteValue: modèle -> vue
<br><br>
Ecrit une valeur dans l'élement. Cette méthode est appelée quand:
<ul>
    <li>instanciation d'un nouveau FormControl</li>
    <li>quand on appelle la méthode patchValue/setValue</li>
</ul>

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->

# registerOnChange: vue -> modèle
<br>
<ul>
    <li>Set une fonction à appeler quand il y a un changement dans votre composant</li>
</ul>
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
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->

# registerOnTouched: vue -> modèle
<br>
<ul>
    <li>Set une fonction à appeler quand votre composant a été "touched"</li>
</ul>
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
<!-- .element: class="big-code" -->
