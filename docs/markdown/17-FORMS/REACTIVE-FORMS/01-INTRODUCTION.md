<!-- .slide: class="transition-bg-sfeir-1" -->

# Reactive Forms

##==##

<!-- .slide: class="with-code inconsolata" -->

# Getting Started with Reactive Forms

For standalone components, import `ReactiveFormsModule` directly into the component's `imports` array.
<br/><br/>

```typescript
@Component({
  selector: 'sfeir-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule], // Import here
  templateUrl: './user-profile.html',
})
export class UserProfile {}
```

<br/><br/>

<!-- .element: class="medium-code" -->

For module-based apps, you would add `ReactiveFormsModule` to the `imports` array of your `NgModule`.

##==##

# Base Concepts of Reactive Forms

<br/><br/>

> Reactive forms is entirely based on code (means in the component) and manage by

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Building a Reactive Form

```typescript
interface Controls {
  firstname: FormControl<string>;
  address: FormGroup<{
    zipCode: FormControl<string>;
    country: FormControl<string>;
  }>;
}

@Component({
  selector: 'sfeir-user-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.html',
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup<Controls> = new FormGroup({
    firstname: new FormControl('', {
      validators: [Validators.required, Validators.minLength(2)],
      nonNullable: true,
    }),
    address: new FormGroup({
      zipCode: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      country: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    }),
  });
}
```

<!-- .element: class="small-code" -->

##++##
##++## class="with-code inconsolata"

<br/><br/><br/>

```angular181html
<form [formGroup]="profileForm" (ngSubmit)="save()">
  <!-- Bind a simple control -->
  <input type="text" formControlName="firstname" />

  @if (firstname?.invalid && firstname?.touched) {
  <div>Firstname is invalid</div>
  }

  <!-- Bind a nested group -->
  <div formGroupName="address">
    <input formControlName="zipCode" type="text" />
    <input formControlName="country" type="text" />
  </div>

  <button type="submit" [disabled]="profileForm.invalid">Update</button>
</form>
```

<!-- .element: class="medium-code" -->

##++##

##==##

<!-- .slide: class="with-code inconsolata" -->

# Key Concepts

- **`[formGroup]`**: Binds the top-level `FormGroup` instance in your component to the `<form>` element. <br/><br/>
- **`formControlName`**: Binds an individual `FormControl` within the `FormGroup` to a form input. <br/><br/>
- **`formGroupName`**: Binds a nested `FormGroup` to a container element (like a `div`). <br/><br/>
- **`ngSubmit`**: A directive that lets you handle the form's submit event.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Accessing form data

```typescript
@Component({
  selector: 'sfeir-user-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.html',
})
class UserProfileComponent {
  profileForm: FormGroup<UserProfile>;

  save() {
    console.log(this.profileForm.value); // return enabled value
    console.log(this.profileForm.getRawValue()); // return all value include disabled
  }
}
```

<!-- .element: class="medium-code" -->

Notes:

- Creating a getter for a form control (`get firstname()`) simplifies your template logic.
- Using `nonNullable: true` ensures that the control's value will never be `null`.
