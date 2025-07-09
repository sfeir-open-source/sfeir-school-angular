<!-- .slide: class="with-code inconsolata" -->
# Validation with Template-Driven Forms

- Validation is done using standard HTML validation attributes:<br/><br/>
    - required
    - minLength
    - maxLength
    - pattern
    - ...
<br/><br/>

Okay, but what if a field is required based on another one?
<!-- .element: class="important" -->
<br/>
Well, we use the property bound to the attribute.
<br/>

```html
<input type="text" name="lastname" [(ngModel)]="person.lastname"
  [required]="person.firstname" />
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide -->
# Displaying Validation Messages

- Use a template reference variable (e.g., `#firstname="ngModel"`) to access the control's state.
- Check if the control is `invalid` and `touched` before showing errors.

```html
<form #profileForm="ngForm">
  <input
    type="text"
    name="firstname"
    [(ngModel)]="person.firstname"
    #firstname="ngModel"
    required
    minlength="4"
  />

  @if (firstname.invalid && firstname.touched) {
    <div class="error-messages">
      @switch (true) {
        @case (firstname.hasError('required')) {
          <span>This field is required.</span>
        }
        @case (firstname.hasError('minlength')) {
          <span>Firstname must be at least 4 characters long.</span>
        }
      }
    </div>
  }
</form>
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide -->
# The different states of a control

<br/>

- <b>control.pristine</b>: the user has not interacted with the control.
- <b>control.dirty</b>: the user has already interacted with the control.
- <b>control.valid</b>: the control is valid.
- <b>control.invalid</b>: the control is not valid.
- <b>control.touched</b>: the control has lost focus.
- <b>control.untouched</b>: the control has not yet lost focus.

##==##

<!-- .slide-->
# The different classes available for styling<br/>

- .ng-valid / .ng-invalid <br/><br/>
- .ng-pristine / .ng-dirty<br/><br/>
- .ng-touched / .ng-untouched
