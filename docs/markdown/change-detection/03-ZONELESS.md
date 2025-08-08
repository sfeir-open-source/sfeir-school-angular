<!-- .slide: class="transition-bg-sfeir-2" -->

# Why OnPush Change Detection don't solve all the problems ?

##==##

# Change Detection Strategy: On Push (waiting event)

![full-center](assets/images/school/change-detection/cd_on-push_OP.png)

##==##

# Change Detection Strategy: Default (dirty checking)

![full-center](assets/images/school/change-detection/cd_on-push_OP_dirty.png)

##==##

# Change Detection Strategy: Default (change detection)

![full-center](assets/images/school/change-detection/cd_on-push_OP_cd.png)

##==##

# Zoneless Angular Applications

<!-- .slide: class="transition-bg-sfeir-2" -->

##==##

# Why Remove Zone.js?

- Reduces bundle size (around 40KB) <br/><br/>
- Improves performance by eliminating unnecessary change detection cycles <br/><br/>
- Gives you more control over when change detection runs <br/><br/>
- Prepares your app for modern reactive patterns <br/><br/>
- Required for some environments where Zone.js doesn't work well

Notes:

- Zone.js adds overhead by patching many browser APIs
- In large applications, this can lead to performance issues
- Some third-party libraries may have issues with Zone.js
- Removing Zone.js forces you to be more intentional about change detection

##==##

<!-- .slide: class="with-code inconsolata" -->

# How to Remove Zone.js

1. Update `main.ts` to bootstrap without Zone.js

```typescript
import { provideZonelessChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection()],
});
```

<br/><br/>

2. Remove Zone.js from `polyfills.ts` (if it exists)

```typescript
// Remove or comment out:
// import 'zone.js';
```

<br/><br/>

3. Update your `package.json` to remove zone js as a dependency

Notes:

- The `provideZonelessChangeDetection` disables Zone.js
- You'll need to manually trigger change detection or use signals
- This is a significant architectural change for an existing application

##==##

<!-- .slide: class="with-code inconsolata" -->

# The Challenge: Manual Change Detection

Without Zone.js, UI won't automatically update after:

```typescript
@Component({
  selector: 'app-counter',
  template: `<button (click)="increment()">Count: {{ count }}</button>`,
})
export class CounterComponent {
  count = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  increment() {
    this.count++;
    // Without Zone.js, we need this:
    this.cdr.markForCheck();
  }
}
```

<!-- .element: class="medium-code" -->

Notes:

- Without Zone.js, you need to manually trigger change detection
- This becomes tedious and error-prone in complex applications
- This is where signals come in as a better solution

##==##

# Why Signals are Necessary for Zoneless Apps

- Signals provide a fine-grained reactivity system <br/><br/>
- They automatically track dependencies and notify subscribers <br/><br/>
- Enable automatic UI updates without Zone.js <br/><br/>
- Provide better performance by only updating what changed <br/><br/>
- Make reactive programming patterns more accessible

Notes:

- Signals were introduced in Angular 16 and improved in Angular 17
- They represent a shift toward a more explicit reactivity model
- They're designed to work well in zoneless applications

##==##

<!-- .slide: class="two-column with-code inconsolata" -->

# Traditional Property

```typescript
@Component({
  template: `<div>{{ count }}</div>`,
})
export class CounterComponent {
  count = 0;

  increment() {
    this.count++;
    // Need manual CD without Zone
  }
}
```

<!-- .element: class="medium-code" -->

##--##

# Signal

```typescript
@Component({
  template: `<div>{{ count() }}</div>`,
})
export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.update(c => c + 1);
    // No manual CD needed!
  }
}
```

<!-- .element: class="medium-code" -->

Notes:

- With signals, the template knows exactly what changed
- No need for manual change detection or dirty checking
- The function call syntax in templates helps Angular track dependencies

##==##

# What Signals Bring to Change Detection

1. **Fine-grained updates**: Only components that depend on changed signals update <br/><br/>
2. **Automatic dependency tracking**: Angular knows exactly what to update <br/><br/>
3. **Improved performance**: No need to check everything on every change <br/><br/>
4. **Explicit reactivity**: Clear data flow and dependencies <br/><br/>
5. **Composable patterns**: Computed values, effects, and more <br/><br/>

<!-- .element: class="list-fragment" -->

Notes:

- Signals represent a fundamental shift in Angular's change detection strategy
- They bring Angular closer to other modern reactive frameworks
- They're especially valuable in large, complex applications

##==##

<!-- .slide: class="with-code inconsolata" -->

# Signal-Based Change Detection

```typescript
@Component({
  template: `
    <h1>{{ title() }}</h1>
    <p>Count: {{ count() }}</p>
    <p>Double count: {{ doubleCount() }}</p>
    <button (click)="increment()">Increment</button>
  `,
})
export class AppComponent {
  title = signal('Zoneless App');
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update(c => c + 1);
  }
}
```

<!-- .element: class="medium-code" -->

Notes:

- Signals are read by calling them as functions: `count()`
- Computed values automatically update when their dependencies change
- The template subscribes to these signals and updates only when needed

##==##

# Best Practices for Zoneless Apps

1. Use signals for all reactive state <br/><br/>
2. Leverage computed() for derived values <br/><br/>
3. Use effect() for side effects <br/><br/>
4. Keep components small and focused <br/><br/>
5. Consider using RxJS with signals for complex async workflows <br/><br/>
6. Use OnPush change detection strategy for any non-signal components <br/><br/>

Notes:

- Zoneless apps require more discipline but can be more performant
- Signals make this approach much more manageable
- The transition can be gradual - you can start using signals in a Zone-based app

##==##

# Summary: Zoneless Angular

- Removing Zone.js gives you more control and better performance <br/><br/>
- Signals provide the reactivity mechanism to replace Zone.js <br/><br/>
- Signal-based change detection is more efficient and predictable <br/><br/>
- The explicit reactivity model leads to cleaner, more maintainable code <br/><br/>
- Angular is moving toward a signal-first approach in future versions

Notes:

- Angular is evolving toward a more explicit reactivity model
- Signals are the foundation of this new approach
- Learning signals now prepares you for future Angular development
- Zoneless applications represent a more modern, efficient way to build Angular apps
