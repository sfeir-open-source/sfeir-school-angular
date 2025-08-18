<!-- .slide: class="with-code inconsolata" -->

# The ng-template directive

- Allows defining a template in Angular
- Template type: `TemplateRef<T>` where T is the type of the context <br/><br/>

```html
<div *ngIf="lessons.length > 0">...</div>
<ng-template>
  <div>Loading ...</div>
</ng-template>
```

<!-- .element: class="medium-code" -->
<br/>

- `Loading` will never be displayed here
- We have just defined a template, but we are not using it
  <br/><br/>

So how do we use it?

<!-- .element: class="bold important" -->

Notes:

- `ng-template` is like declaring a simple variable; in this case, the variable is a template.

##==##

<!-- .slide: class="inconsolata with-code" -->

# Using the ng-template directive

- It is mainly used with structural directives like the deprecated *ngIf, *ngFor ...
  <br/><br/>

```html
<div *ngIf="lessons.length > 0; else loadingTemplate">...</div>
<ng-template #loadingTemplate>
  <div>Loading ...</div>
</ng-template>
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Using the ng-template directive

- In fact, structural directives like the deprecated *ngIf, *ngFor ... are themselves 'ng-templates'! <br/><br/>

```html
<div *ngIf="condition">...</div>
```

<!-- .element: class="big-code" -->

<br/><br/>

is a shortcut for: <br/><br/>

```html
<ng-template [ngIf]="condition">
  <div>...</div>
</ng-template>
```

<!-- .element: class="big-code" -->
