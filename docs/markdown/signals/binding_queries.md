# Preparing for Signal Components

To prepare for signal-based components, certain decorators are replaced by functions:<br/>
- `@Input` -> `input()`
- `@Output` -> `output()`
- `@ViewChild` -> `viewChild()`
- `@ViewChildren` -> `viewChildren()`
- `@ContentChild` -> `contentChild()`
- `@ContentChildren` -> `contentChildren()`
- `[(binding)]` -> `model()`

##==##

## Why move to Signal Components?

In Angular, change detection is managed by Zone.js. Any change can trigger a check of the entire component tree.

- An `OnPush` component is not checked if its inputs haven't changed.
- A component with default change detection is always checked.

<br/><br/>

What if we only checked the components that were actually modified?
<!-- .element: class="important" -->

<br/><br/>

**This is possible with Signals!**

##==##

<!-- .slide: class="with-code inconsolata"-->
# The `input()` function

The `input()` function declares an input property in a component.
<br/><br/>

```typescript
@Component({...})
export class MyComponent {
  name = input.required<string>();
  age = input<number>(0);
}
```
<!-- .element: class="medium-code" -->

<br/>

```html
<my-component [name]="'Alice'" [age]="30" />
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata"-->
# The `output()` function

The `output()` function declares an output property in a component.
<br/><br/>

```typescript
import { output, OutputEmitterRef } from "@angular/core";

@Component({...})
export class MyComponent {
  nameChange: OutputEmitterRef<string> = output<string>();

  sendName() {
    this.nameChange.emit('New Name');
  }
}
```
<!-- .element: class="medium-code" -->

<br/>

```html
<my-component (nameChange)="updateName($event)" />
```
<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata"-->
# RxJS Interoperability: `output`

- `outputToObservable`: converts an `output()` to an observable.
- `outputFromObservable`: converts an observable to an `output()`.

<br/><br/>

```typescript
import { outputFromObservable } from '@angular/core/rxjs-interop';

@Component({...})
export class MyComponent {
  name = new FormControl<string>('');
  nameChange = outputFromObservable(this.name.valueChanges);
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata"-->
# The `model()` function 

The `model()` function declares a two-way data binding property.


```typescript
@Component({...})
export class MyComponent {
  name = model<string>('');
}
```
<!-- .element: class="medium-code" -->


```html
<my-component [(name)]="firstname" />
```
<!-- .element: class="medium-code"-->

<br/><br/>

In this example, `firstname` can be:
- A simple JavaScript value
- A signal

##==##

<!-- .slide: class="with-code inconsolata"-->
# The `viewChild` and `contentChild` functions

<br/>

- These functions retrieve elements from the DOM within a component.<br/><br/>
- They return a signal.

<br/> <br/>

```typescript
import { Component, ElementRef, viewChild } from "@angular/core";

@Component({...})
export class MyComponent {
  input = viewChild.required<ElementRef<HTMLInputElement>>('input');

  logInputValue() {
    // The signal's value might be undefined until after the view is initialized.
    console.log(this.input()?.nativeElement.value);
  }
}
```
<!-- .element: class="big-code"-->
