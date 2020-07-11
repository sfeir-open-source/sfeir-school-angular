<!-- .slide: class="with-code inconsolata" -->
# La validation avec les reactives forms
<br><br>

```html
<form [formGroup]="editForm">
  <div>
    <input formControlName="firstname">  
      <div [hidden]="!editForm.controls.firstname.errors?.required">
        <span class="help-block">Ce champ est obligatoire</span>
      </div>
   </div>
</form>
```
<!-- .element: class="big-code" -->
