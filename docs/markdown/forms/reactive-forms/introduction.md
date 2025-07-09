<!-- .slide: class="transition-bg-sfeir-1" -->
# Reactive Forms

##==##

<!-- .slide: class="with-code inconsolata" -->
# Getting Started with Reactive Forms

For standalone components, import `ReactiveFormsModule` directly into the component's `imports` array.
<br/><br/>

```typescript
// user-profile.component.ts
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule], // Import here
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {
  // ...
}
```
<!-- .element: class="medium-code" -->

For module-based apps, you would add `ReactiveFormsModule` to the `imports` array of your `NgModule`.

##==##

<!-- .slide: class="two-column with-code inconsolata" -->
# Building a Reactive Form

Let's build a form to edit a user profile.

```typescript
// user-profile.component.ts
import { Validators, FormControl, FormGroup } from '@angular/forms';

// 1. Define the form's data structure
interface UserProfile {
  firstname: FormControl<string>;
  address: FormGroup<{ // 2. Nest a FormGroup
    zipCode: FormControl<string>;
    country: FormControl<string>;
  }>;
}

@Component({ ... })
export class UserProfileComponent implements OnInit {
  // 3. Declare the form property
  profileForm: FormGroup<UserProfile>;

  ngOnInit() {
    // 4. Initialize the form
    this.profileForm = new FormGroup({
      firstname: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)],
        nonNullable: true,
      }),
      address: new FormGroup({
        zipCode: new FormControl('', { validators: [Validators.required], nonNullable: true }),
        country: new FormControl('', { validators: [Validators.required], nonNullable: true }),
      })
    });
  }

  // 5. Add a getter for easy template access
  get firstname() {
    return this.profileForm.get('firstname');
  }
}
```
<!-- .element: class="small-code" -->

##--##

<br/>

```html
<!-- user-profile.component.html -->
<form [formGroup]="profileForm" (ngSubmit)="save()">

  <!-- Bind a simple control -->
  <input type="text" formControlName="firstname">

  @if (firstname?.invalid && firstname?.touched) {
    <div>Firstname is invalid</div>
  }

  <!-- Bind a nested group -->
  <div formGroupName="address">
    <input formControlName="zipCode" type="text" />
    <input formControlName="country" type="text" />
  </div>

  <button type="submit" [disabled]="profileForm.invalid">
    Update
  </button>
</form>
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Key Concepts

- **`[formGroup]`**: Binds the top-level `FormGroup` instance in your component to the `<form>` element.

- **`formControlName`**: Binds an individual `FormControl` within the `FormGroup` to a form input.

- **`formGroupName`**: Binds a nested `FormGroup` to a container element (like a `div`).

- **`ngSubmit`**: A directive that lets you handle the form's submit event.

<br/>

```typescript
// Accessing form data
class UserProfileComponent {
  // ...
  profileForm: FormGroup<UserProfile>;

  save() {
    // The `value` property contains the current data
    console.log(this.profileForm.value);
    // { firstname: '...', address: { zipCode: '...', country: '...' } }

    // Use `getRawValue()` to include disabled controls
    console.log(this.profileForm.getRawValue());
  }
}
```
<!-- .element: class="medium-code" -->

Notes:
- Creating a getter for a form control (`get firstname()`) simplifies your template logic.
- Using `nonNullable: true` ensures that the control's value will never be `null`.
