<!-- .slide: class="with-code inconsolata" -->

# Implementing a lifecycle hook

```typescript
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'sfeir-user',
  templateUrl: './user.html',
})
export class User implements OnInit {
  ngOnInit(): void {
    console.info('sfeir-user', 'init');
  }
}
```

<!-- .element: class="big-code" -->

##==##

# Implementing lifecycle: Methodology

- **First**: Implement the corresponding interface <br/><br/>
- **Second**: Implement the corresponding method defined by the interface

##==##

# The different lifecycle hooks

- **ngOnChanges():** responds every time one of the input properties changes
- **ngOnInit():** initializes the component/directive after its creation (once)
- **ngDoCheck():** allows acting on change detection
- **ngAfterContentInit():** responds after the component's content has been initialized (once)
- **ngAfterContentChecked():** responds after Angular has checked the component's content
- **ngAfterViewInit():** responds after the component's view has been initialized (once)
- **ngAfterViewChecked():** responds after Angular has checked the view's content
- **ngOnDestroy():** allows for cleanup before the component is destroyed (once)
