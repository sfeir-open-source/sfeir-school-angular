<!-- .slide: class="transition-bg-sfeir-2" -->

# Create your own directives

##==##

<!-- .slide: class="sfeir-basic-slide" -->

# A few reminders about directives

![h-300 center](assets/images/school/directive/directive_schema.png) <br/>

- structural directives: modify the DOM<br/>
- attribute directives: modify the appearance or behavior of an element<br/>
- component: directive with a view<br/>

##==##

<!-- .slide: class="with-code inconsolata" -->

# Directive definition

```typescript
import { Directive } from '@angular/core';

@Directive({
  selector: '[myDirective]',
})
export class MyDirective {}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide -->

# How to invoke a directive?

- <b>element-name</b>: to restrict to an element<br/><br/>
- <b>[attribute]</b>: to restrict to an attribute<br/><br/>
- <b>.class</b>: to restrict to a class<br/><br/>
- <b>[attribute=value]</b>: to restrict to an attribute with a certain value<br/><br/>
- <b>:not(sub_selector)</b>: if the element does not match the sub-selector

##==##

<!-- .slide: class="two-column with-code inconsolata" -->

## Some examples

```typescript
@Directive({
  selector: '[sfeirButton]',
})
export class SfeirButtonDirective {}
```

<!-- .element: class="big-code" -->

<br/><br/>

```typescript
@Directive({
  selector: '.error',
})
export class ErrorDirective {}
```

<!-- .element: class="big-code" -->

##--##

<!-- .slide: class="with-code inconsolata"-->

<br/><br/><br/>

```typescript
@Directive({
  selector: 'input[onlyNumber]',
})
export class OnlyNumberDirective {}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# How to pass props to my directive

- List inputs using the **input()** signal function
- These inputs can be aliased
- **Exactly like for components**
- keep it in mind if you use Angular < v16, you have to use **@Input** decorator

```typescript
@Directive({
  selector: '[foobar]',
})
export class MyDirective {
  myProp = input('');
  myProp2 = input('', { alias: 'name' });
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# How to interact with DOM elements

- ElementRef (injectable) allows you to directly get the element on which the directive acts
- Renderer2 (injectable) allows you to interact with the DOM<br/><br/>

```typescript
@Directive({
  selector: '[foobar]',
})
export class MyDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide -->

# Interaction with the DOM

- Prefer using Renderer instead of ElementRef<br/><br/>
- No direct dependency on the DOM<br/><br/>
- Allows the application to run in other environments (EDGE, Firefox)

##==##

<!-- .slide: class="sfeir-basic-slide" -->

# Interaction with the DOM: Practices

<div class="container-practice border-red">
  <div class="icon-satisfaction">X</div>
  <div class="code">document.querySelector('#someId').innerHTML = 'X';</div>
</div>
<br/><br/>
<div class="container-practice border-orange">
  <div class="icon-satisfaction">:/</div>
  <div class="code">this.element.nativeElement.style.color = 'orange';<br/>this.element.nativeElement.innerHTML = ':/';</div>
</div>
<br/><br/>
<div class="container-practice border-green">
  <div class="icon-satisfaction">:)</div>
  <div class="code">this.renderer.setStyle(this.element.nativeElement, 'color', '#0f0');<br/>this.renderer.setProperty(this.element.nativeElement, 'innerHTML', ':)');</div>
</div>

##==##

<!-- .slide: class="with-code inconsolata" -->

# Events

- **output()** to propagate events <br/><br/>
- **host property with event binding** to listen for events on the host element <br/><br/>

```typescript
@Directive({ selector: '[myDirective]', host: { '(click)': 'handleClick($event)' } })
export class MyDirective {
  somethingChange = output<{ event: MouseEvent; data: any }>();
  handleClick(event: MouseEvent) {
    this.somethingChange.emit({ event, data: 'some data' });
  }
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Events Before Signal

- **@Output decorator()** to propagate events
- **host property with event binding** to listen for events on the host element
- **HostListener Decorator** to listen for events on the host element <br/><br/>

```typescript
import { EventEmitter, HostListener } from '@angular/core';

@Directive({ selector: '[myDirective]' })
export class MyDirective {
  @Output() somethingChange = new EventEmitter<{ event: MouseEvent; data: any }>();

  @HostListener('click', [$event]) handleClick(event: MouseEvent) {
    this.somethingChange.emit({ event, data: 'some data' });
  }
}
```

<!-- .element: class="medium-code" -->
