# The ng-content directive

- Allows for transclusion (the ability to add content dynamically) <br><br>
- Must be used within components <br><br>
- Takes a `select` attribute to allow transclusion on a specific element

##==##

# The power of the select attribute

- The attribute is not **mandatory**<br><br>
- Can be made a property: **[select]**="'.'+selectedClass"<br><br>
- Allows transclusion on any CSS selector
  - a class **select**=".my_class"
  - an attribute **select**="[name='submit-button']"
  - an HTML element **select**="button" <br><br>
- For more fun, you can mix them ;)
  - **select**="button[type='submit']"

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata"-->

##++##

# An example is better for understanding

```typescript
@Component({
  selector: 'app-loader',
  template: `
    <section>
      <div class="loading" *ngIf="isLoading; else notLoading"></div>
      <ng-template #notLoading>
        <ng-content />
      </ng-template>
    </section>
  `,
})
export class LoadingComponent {}
```

<!-- .element: class="big-code"-->

##++##

##++## class="with-code inconsolata"

<br/><br/><br/><br/><br/>

```typescript
@Component({
  selector: 'app-root',
  template: `
    <app-loader>
      <div>Hello everyone</div>
    </app-loader>
  `,
})
export class AppComponent {}
```

<!-- .element: class="big-code"-->

##++##

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata"-->

##++##

# An example is better for understanding

```typescript
@Component({
  selector: 'app-loader',
  template: `
    <section>
      <div class="loading" *ngIf="isLoading; else notLoading"></div>
      <ng-template #notLoading>
        <ng-content select="button[type='submit']" />
      </ng-template>
    </section>
  `,
})
export class LoadingComponent {}
```

<!-- .element: class="big-code"-->

##++##

##++## class="with-code inconsolata"

<br/><br/><br/><br/><br/>

```typescript
@Component({
  selector: 'app-root',
  template: `
    <app-loader>
      <div>Hello everyone</div>
      <button type="submit">Click Me</button>
    </app-loader>
  `,
})
export class AppComponent {}
```

<!-- .element: class="big-code"-->

##++##

##==##

# **contentChild** and **contentChildren** signal function after v18

- Allows retrieving the content of the transclusion within the component <br/><br/>
- Takes two input parameters (the reference name, an options object: { descendants, read }) <br/><br/>
- Return value
  - **contentChild**: signal<T>
  - **contentChildren**: signal<T[]>

##==##

# **@ContentChild** **@ContentChildren** ? before v18

- Allows retrieving the content of the transclusion within the component <br><br>
- Takes two input parameters (the reference name, an options object: { static, read }) <br><br>
- Return value
  - **@ContentChild**: T
  - **@ContentChildren**: QueryList<T><br><br>

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata "-->

##++##

# An example is better for understanding after v18

```typescript
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <section>
      <div class="loading" *ngIf="isLoading; else notLoading"></div>
      <ng-template #notLoading>
        <ng-content></ng-content>
      </ng-template>
    </section>
  `,
})
export class LoadingComponent {
  myDiv = contentChild<HTMLDivElement>('div');
}
```

<!-- .element: class="medium-code"-->

##++##
##++## class="with-code inconsolata"

<br/><br/><br/><br/><br/>

```typescript
@Component({
  selector: 'app-root',
  template: `
    <app-loader>
      <div #div>Hello everyone</div>
    </app-loader>
  `,
})
export class AppComponent {}
```

<!-- .element: class="medium-code"-->

##++##

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata"-->

##++##

# An example is better for understanding before v18

```typescript
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: `
    <section>
      <div class="loading" *ngIf="isLoading; else notLoading"></div>
      <ng-template #notLoading>
        <ng-content></ng-content>
      </ng-template>
    </section>
  `,
})
export class LoadingComponent {
  @ContentChild('div') myDiv: ElementRef;
}
```

<!-- .element: class="medium-code"-->

##++##
##++## class="with-code inconsolata"

<br/><br/><br/><br/><br/>

```typescript
@Component({
  selector: 'app-root',
  template: `
    <app-loader>
      <div #div>Hello everyone</div>
    </app-loader>
  `,
})
export class AppComponent {}
```

<!-- .element: class="medium-code"-->

##++##
