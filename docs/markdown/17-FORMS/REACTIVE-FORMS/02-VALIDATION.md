<!-- .slide: class="two-column with-code inconsolata" -->

# Validation with reactive forms

```typescript
// user-profile.component.ts
@Component({
  selector: 'sfeir-user-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.html',
})
export class UserProfileComponent {
  editForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });
}
```

<!-- .element: class="medium-code" -->

##--##

<!-- .slide: class="with-code inconsolata" -->

<br/><br/><br/>

```angular181html
<!-- user-profile.component.html -->
<form [formGroup]="editForm">
  <div>
    <input formControlName="firstname" />
    @if (editForm.controls.firstname?.invalid && editForm.controls.firstname?.touched) {
      <div class="error-messages">
      @if(editForm.controls.firstname.errors?.['required']) {
        <span>This field is required.</span>
      }
      @if(editForm.controls.firstname.errors?.['minlength']) {
        <span>Firstname must be at least 4 characters long.</span>
      }
    </div>
    }
  </div>
</form>
```

<!-- .element: class="big-code" -->
