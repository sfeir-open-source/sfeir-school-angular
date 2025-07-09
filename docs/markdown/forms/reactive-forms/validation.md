<!-- .slide: class="with-code inconsolata" -->
# Validation with reactive forms

```typescript
// user-profile.component.ts
@Component({ ... })
export class UserProfileComponent {
  editForm = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  get firstname() {
    return this.editForm.get('firstname');
  }
}
```
<!-- .element: class="medium-code" -->

```html
<!-- user-profile.component.html -->
<form [formGroup]="editForm">
  <div>
    <input formControlName="firstname">

    @if (firstname?.invalid && firstname?.touched) {
      <div class="error-messages">
        @switch (true) {
          @case (firstname?.hasError('required')) {
            <span>This field is required.</span>
          }
          @case (firstname?.hasError('minlength')) {
            <span>Firstname must be at least 4 characters long.</span>
          }
        }
      </div>
    }
  </div>
</form>
```
<!-- .element: class="big-code" -->
