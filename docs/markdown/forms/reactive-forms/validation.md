<!-- .slide: class="with-code inconsolata" -->
# La validation avec les reactive forms

```html
<form [formGroup]="editForm">
  <div>
    <input formControlName="firstname">  
      <div *ngIf="editForm.controls.firstname.errors?.required">
        <span class="help-block">Ce champ est obligatoire</span>
      </div>
   </div>
</form>
```
<!-- .element: class="big-code" -->
