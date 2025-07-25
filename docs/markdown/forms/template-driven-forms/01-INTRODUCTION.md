<!-- .slide: class="transition-bg-sfeir-1" -->

# Template-Driven Forms

##==##

<!-- .slide: class="with-code inconsolata" -->

# Getting Started with Template-Driven Forms

For standalone components, import `FormsModule` directly into the component's `imports` array.
<br/><br/>

```typescript
@Component({
  selector: 'app-user-profile',
  imports: [FormsModule]
  templateUrl: './user-profile.html',
})
export class UserProfile {}
```

<!-- .element: class="medium-code" -->

<br/><br/>

For module-based apps, you would add `FormsModule` to the `imports` array of your `NgModule`.

##==##

# Base Concepts of Template-Driven Forms

<br/><br/>

> Template driven forms is entirely based on templates and manage by it

##==##

<!-- .slide: class="two-column with-code inconsolata" -->

# Building a Template-Driven Form

```typescript
@Component({
  templateUrl: './user-profile.html',
  imports: [FormsModule],
})
export class UserProfile {
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

<!-- .slide: class="with-code inconsolata" -->

<br/></br><br/></br>

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

  <button type="submit" [disabled]="profileForm.invalid">Save</button>
</form>
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Key Directives

- **`#profileForm="ngForm"`**: Creates a template reference variable for the `NgForm` directive, giving you access to the form's state (e.g., `profileForm.value`, `profileForm.invalid`). <br/><br/>
- **`[(ngModel)]`**: Creates a two-way data binding between the input and a component property. It also registers the control with the parent form. <br/><br/>
- **`name`**: A required attribute for any input using `ngModel` within a form. It serves as the key in the form's value object. <br/><br/>
- **`ngModelGroup`**: Groups related controls into a nested object within the form's value.

<!-- .element: class="big-code" -->
