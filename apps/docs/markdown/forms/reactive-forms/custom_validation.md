<!-- .slide: class="transition-bg-grey-2 underline"" -->
# Validation Custom avec les Reactive Forms

##==##

<!-- .slide: class="with-code inconsolata" -->
# Créer ses propres validateurs

- Un validateur custom est une simple <b>fonction</b>
- Si la valeur du contrôle pass la validation : renvoie <b>null</b>
- Sinon : renvoie un objet de cette forme <b>{ nomErreur: true }</b>
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

- Se fait lors de la création du contrôle <br><br>

```typescript
import { CustomValidators } from './validators';
this.formModel = new FormGroup({
  email: new FormControl('', CustomValidators.CustomEmailValidator),
    // or
  email: new FormControl('', [Validators.required, CustomValidators.CustomEmailValidator])
});
```
<!-- .element: class="big-code" -->
