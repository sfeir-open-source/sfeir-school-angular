# A Simple Definition of Signals

Signals is a new way to notify our template that our data has changed.
<!-- .element: class="important full-center"-->

##==##

# The Contribution of Signals
<br /><br/>

- Improve change detection<br/><br/>
- Make our code more reactive<br/><br/>
- A new feature that appeared in Angular version 16

##==##

<!-- .slide: class="with-code inconsolata"-->
# Why Signals?
<br/><br/>

```typescript
let x = 'Sfeir';
let y = 'Luxembourg';
let z = `${x} ${y}`;
console.log(z); // Sfeir Luxembourg

y = 'Paris'

console.log(z); // ?
```
<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->
# Why Signals?

- Getter<br/><br/>
- Event function<br/><br/>

```typescript
let x = 'Sfeir';
let y = 'Luxembourg';

get z() {
  return `${x} ${y}`;
}

console.log(z); // Sfeir Luxembourg
y = 'Paris'
console.log(z); // Sfeir Paris
```
<!-- .element: class="big-code"-->

##==##

# Why Signals?
<br /><br/>

- Provide more reactivity<br/><br/>
- Improve the granularity of our reactivity<br/><br/>
- Improve the performance of our application<br/><br/>

##==##

# What are Signals?

- `Object.create(factory)`
- New primitive reactive system

![center](assets/images/school/signals/signals.png)
