<!-- .slide: class="transition-bg-sfeir-1" -->
# Template-Driven Forms

##==##

<!-- .slide: class="with-code inconsolata" -->
# Getting Started with Template-Driven Forms

For standalone components, import `FormsModule` directly into the component's `imports` array.
<br/><br/>

```typescript
// user-profile.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule], // Import here
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {
  // ...
}
```
<!-- .element: class="medium-code" -->

For module-based apps, you would add `FormsModule` to the `imports` array of your `NgModule`.

##==##

<!-- .slide: class="two-column with-code inconsolata" -->
# Building a Template-Driven Form

The form's logic is managed primarily in the template.

```typescript
// user-profile.component.ts
@Component({ ... })
export class UserProfileComponent {
  person = {
    firstname: 'John',
    address: {
      city: 'Paris',
      postalCode: '75001',
    },
  };

  save(formValue: any) {
    console.log('Form data:', formValue);
  }
}
```

##--##

<br/>

```html
<!-- user-profile.component.html -->
<form #profileForm="ngForm" (ngSubmit)="save(profileForm.value)">

  <!-- 1. Two-way data binding with ngModel -->
  <input name="firstname" [(ngModel)]="person.firstname" required />

  <!-- 2. Group nested fields with ngModelGroup -->
  <div ngModelGroup="address">
    <input name="city" [(ngModel)]="person.address.city" />
    <input name="postalCode" [(ngModel)]="person.address.postalCode" />
  </div>

  <button type="submit" [disabled]="profileForm.invalid">
    Save
  </button>
</form>
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Key Directives

- **`#profileForm="ngForm"`**: Creates a template reference variable for the `NgForm` directive, giving you access to the form's state (e.g., `profileForm.value`, `profileForm.invalid`).

- **`[(ngModel)]`**: Creates a two-way data binding between the input and a component property. It also registers the control with the parent form.

- **`name`**: A required attribute for any input using `ngModel` within a form. It serves as the key in the form's value object.

- **`ngModelGroup`**: Groups related controls into a nested object within the form's value.

<br/>

```json
// Example profileForm.value
{
  "firstname": "John",
  "address": {
    "city": "Paris",
    "postalCode": "75001"
  }
}
```
<!-- .element: class="big-code" -->
