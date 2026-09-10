# A list view with nothing reusable in it

The Staff Directory can already switch between a card view and a list view — but the list view is a raw Angular Material `<mat-list>` hard-coded straight into `staff-directory.html`, row markup and all.

<br/><br/>

Fine, as long as only `StaffDirectory` ever needs a list. The moment another feature wants a Material list with *different* row markup, it has to copy-paste the same `@for` loop and item template again. `apps/21-teleportation` builds the reusable version: a generic `sfeir-list` component that owns the `<mat-list>` and the iteration, while its **caller** decides what each row looks like.

##==##

<!-- .slide: class="with-code inconsolata" -->

# `<ng-template>`: defining a template without rendering it

```html
<div *ngIf="lessons.length > 0">...</div>
<ng-template>
  <div>Loading ...</div>
</ng-template>
```

<!-- .element: class="medium-code" -->

- `Loading` never renders here — an `<ng-template>` just **declares** a template, like declaring a variable<br/><br/>
- Its type is `TemplateRef<T>`, where `T` describes the shape of whatever context it will eventually be given

##==##

<!-- .slide: class="with-code inconsolata" -->

# Naming a template with a reference variable

```html
<div *ngIf="lessons.length > 0; else loadingTemplate">...</div>
<ng-template #loadingTemplate>
  <div>Loading ...</div>
</ng-template>
```

<!-- .element: class="big-code" -->

- `#loadingTemplate` is a **template reference variable** — the same `#name` syntax used on any element, just applied to an `<ng-template>`<br/><br/>
- It's how a structural directive like the deprecated `*ngIf`'s `else` clause locates a template to swap in
