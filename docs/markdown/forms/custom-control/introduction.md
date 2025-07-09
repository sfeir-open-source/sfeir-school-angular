<!-- .slide: class="with-code inconsolata" -->
# Context

Let's imagine I want to create a dropdown component and want to have the power of Angular forms validation.
<br/>

We could imagine something like this.
<br/><br/>

```html
<form [formGroup]="sfeirForm">
    <sfeir-dropdown formControlName="agency"></sfeir-dropdown>
</form>
```
<!-- .element: class="big-code" -->
<br/><br/>

Will the controls on agency work?
<!-- .element: class="important center" -->
<br/>

Notes:
- The answer is NO. For a custom component to integrate with Angular's forms (e.g., `formControlName`, `ngModel`), it must implement the `ControlValueAccessor` interface.
- This interface acts as a bridge between the Angular forms API and the native element within your component's view.
- Angular provides built-in value accessors for standard HTML form elements, but for custom components, you must provide your own.
