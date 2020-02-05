<!-- .slide: class="sfeir-bg-white-5" -->
# Validation Custom avec les Reactive Forms

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Créer ses propres validateurs
<br>
- un validateur custom est une simple <strong>fonction</strong>
- Si la validation est bonne: renvoie <strong>null</strong>
- Si la validation n'est pas correct: renvoie un object de cette forme <strong>{ nomErreur: true }</strong>
<br><br>
```typescript
import { ValidationErrors } from '@angular/forms';
abstract class CustomValidators {
    protected constructor() {}

    static CustomEmailValidator(c: FormControl): ValidationErrors | null {   
        return (c.value.indexOf('@') !== -1) ? null : { email: true };
    }  
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Utiliser son validateur
<br>
<ul>
    <li>Se fait lors de la création du control</li>
</ul>
<br><br>
```typescript
import { CustomValidators } from './validators';
this.formModel = new FormGroup({
    email: new FormControl('', CustomValidators.CustomEmailValidator),
    // or
    email: new FormControl('', Validators.compose([Validators.required, CustomValidators.CustomEmailValidator]))
});
```
<!-- .element: class="big-code" -->
