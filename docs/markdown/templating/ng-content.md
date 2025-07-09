# The ng-content directive

- Allows for transclusion (the ability to add content dynamically) <br><br>
- Must be used within components <br><br>
- Takes a `select` attribute to allow transclusion on a specific element

##==##

# The power of the select attribute

- The attribute is not __mandatory__<br><br>
- Can be made a property:  __[select]__="'.'+selectedClass"<br><br>
- Allows transclusion on any CSS selector
    - a class __select__=".my_class"
    - an attribute __select__="[name='submit-button']"
    - an HTML element __select__="button" <br><br>
- For more fun, you can mix them ;)
    - __select__="button[type='submit']"

##==##

<!-- .slide: class="two-column-layout"-->

# An example is better for understanding

##--##

<!-- .slide: class="with-code inconsolata" -->

````typescript
@Component({
    selector: 'app-loader',
    template: `
        <section>
            <div class="loading" *ngIf="isLoading,
              else notLoading "></div>
            <ng-template #notLoading>
                <ng-content></ng-content>
            </ng-template>
        </section>
`
})
export class LoadingComponent {}
````

<!-- .element: class="big-code"-->

##--##

<!-- .slide: class="with-code inconsolata" -->

````typescript
@Component({
    selector: 'app-root',
    template: `
        <app-loader>
          <div>Hello everyone</div>
        </app-loader>
`
})
export class AppComponent {}
````

<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="two-column-layout"-->

# An example is better for understanding

##--##

<!-- .slide: class="with-code inconsolata" -->

````typescript
@Component({
    selector: 'app-loader',
    template: `
        <section>
            <div class="loading" *ngIf="isLoading,
              else notLoading "></div>
            <ng-template #notLoading>
                <ng-content select="button[type='submit']">
                </ng-content>
            </ng-template>
        </section>
`
})
export class LoadingComponent {}
````

<!-- .element: class="big-code"-->

##--##

<!-- .slide: class="with-code inconsolata" -->

````typescript
@Component({
    selector: 'app-root',
    template: `
        <app-loader>
          <div>Hello everyone</div>
          <button type="submit">Click Me</button>
        </app-loader>
`
})
export class AppComponent {}
````

<!-- .element: class="big-code"-->

##==##

# __@ContentChild__ __@ContentChildren__ ?

- Allows retrieving the content of the transclusion within the component <br><br>
- Takes two input parameters (the reference name, an options object: { static, read }) <br><br>
- Return value
    - __@ContentChild__: T
    - __@ContentChildren__: QueryList<T><br><br>

##==##

<!-- .slide: class="two-column-layout"-->

# An example is better for understanding

##--##

<!-- .slide: class="with-code inconsolata" -->

````typescript
import { ElementRef } from '@angular/core';

@Component({
    selector: 'app-loader',
    template: `
        <section>
            <div class="loading" *ngIf="isLoading,
              else notLoading "></div>
            <ng-template #notLoading>
                <ng-content></ng-content>
            </ng-template>
        </section>
`
})
export class LoadingComponent {
    @ContentChild('div') myDiv: ElementRef
}
````

<!-- .element: class="medium-code"-->

##--##

<!-- .slide: class="with-code inconsolata" -->

````typescript
@Component({
    selector: 'app-root',
    template: `
        <app-loader>
          <div #div>Hello everyone</div>
        </app-loader>
`
})
export class AppComponent {}
````

<!-- .element: class="big-code"-->
