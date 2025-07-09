<!-- .slide -->
# Angular: a component tree

![h-600 center](assets/images/school/components/component_tree.png)

##==##
<!-- .slide: class="with-code inconsolata" -->
# The @Component decorator
A component's identity card<br/>

- selector
- template and templateUrl
- styles and styleUrls
- ...<br/><br/>

```typescript
@Component({
  selector: 'sfeir-app',
  templateUrl: './home.component.html', 
  styleUrls: ['./home.component.css'],
  ...
})
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Nesting components
When a parent component wants to use child components<br/>

- child components must all be referenced using their selectors
- child components must be declared in the "declarations" of the <b>@NgModule()</b><br/><br/>

```html
<!-- app.component.html -->
<sfeir-home></sfeir-home>
```
<!-- .element: class="big-code" -->

```typescript
// app.module.ts
import { HomeComponent } from './app/home';
import { FooDirective } from './app/shared/foo.directive';

@NgModule({
  declarations: [HomeComponent, FooDirective]  
})
export class AppModule { }
```
<!-- .element: class="big-code" -->
