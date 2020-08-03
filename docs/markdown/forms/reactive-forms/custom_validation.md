<!-- .slide: class="transition-bg-grey-2 underline"" -->
# Validation Custom avec les Reactive Forms

##==##

<!-- .slide: class="with-code inconsolata" -->
# Créer ses propres validateurs
<br>

- un validateur custom est une simple <b>fonction</b>
- Si la validation est bonne : renvoie <b>null</b>
- Si la validation n'est pas correct : renvoie un object de cette forme <b>{ nomErreur: true }</b>
<br><br>

```typescript
import { FormControl, ValidationErrors } from '@angular/forms';
export abstract class CustomValidators {
  protected constructor() {}

  static CustomEmailValidator(c: FormControl): ValidationErrors | null {   
    return (c.value.indexOf('@') !== -1) ? null : { email: true };
  }  
}
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code inconsolata" -->
# Utiliser son validateur
<br>

- Se fait lors de la création du control <br><br>

```typescript
import { CustomValidators } from './validators';
this.formModel = new FormGroup({
  email: new FormControl('', CustomValidators.CustomEmailValidator),
    // or
  email: new FormControl('', Validators.compose([Validators.required, CustomValidators.CustomEmailValidator]))
});
```
<!-- .element: class="big-code" -->
