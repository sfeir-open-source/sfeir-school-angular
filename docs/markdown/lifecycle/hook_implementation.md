<!-- .slide: class="with-code inconsolata" -->
# Implementing a lifecycle hook

```typescript
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'sfeir-user',
  templateUrl: './user.component.html'  
})
export class UserComponent implements OnInit {
  ngOnInit(): void {
    console.info('sfeir-user', 'init');  
  }  
}
```
<!-- .element: class="big-code" -->


##==##
<!-- .slide -->
# The different lifecycle hooks

- <b>ngOnChanges(): </b>responds every time one of the input properties changes
- <b>ngOnInit(): </b>initializes the component/directive after its creation (once)
- <b>ngDoCheck(): </b>allows acting on change detection
- <b>ngAfterContentInit(): </b>responds after the component's content has been initialized (once)
- <b>ngAfterContentChecked(): </b>responds after Angular has checked the component's content
- <b>ngAfterViewInit(): </b>responds after the component's view has been initialized (once)
- <b>ngAfterViewChecked(): </b>responds after Angular has checked the view's content
- <b>ngOnDestroy(): </b>allows for cleanup before the component is destroyed (once)
