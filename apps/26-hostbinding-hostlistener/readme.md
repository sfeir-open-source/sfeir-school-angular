# Exercise 26: HostBinding and HostListener in Angular (folder apps/26-hostbinding-hostlistener)

In this workshop, you'll learn how to use Angular's host binding and host listener features to create interactive directives. You'll enhance the existing badge directive to respond to mouse events and dynamically change styles.

## What are HostBinding and HostListener?

**HostBinding** allows you to bind properties of the host element (the element the directive is applied to) to properties in your directive class. This is useful for:

- Setting CSS styles dynamically
- Adding or removing CSS classes
- Setting element attributes

**HostListener** allows you to listen to events on the host element and respond to them in your directive. This enables:

- Handling user interactions
- Responding to DOM events
- Creating interactive behaviors

## Modern Approach: Host Metadata

While `@HostBinding` and `@HostListener` decorators are still supported, Angular now recommends using the `host` metadata property in the `@Directive` decorator for better performance and tree-shaking.

## Step 1: Add Color Management

1. First, import the `signal` function from Angular core in your `badge.ts` file:
2. Add a signal to manage the badge color in the `Badge` color style initially set to black

## Step 2: Add Host Bindings and Listeners

1. Update the `@Directive` decorator to include host metadata:
   - Binds the `style.color` property to the `badgeColor()` signal
   - Listens to `mouseover` events and calls `onMouseOver()`
   - Listens to `mouseout` events and calls `onMouseOut()`

## Step 3: Implement Event Handlers

1. Add the event handler methods to your `Badge` class

- on mouseover the badge need to be red
- on mouseout the badge need to be black

## Step 4: Test Your Implementation

1. Run the application:

   ```bash
   npm run client -- 26-hostbinding-hostlistener
   ```

2. Navigate to the people list and verify that:
   - Manager badges appear as black icons initially
   - When you hover over a manager badge, it turns red
   - When you move the mouse away, it returns to black

## Understanding the Implementation

### Host Metadata vs Decorators

The modern approach using `host` metadata:

```typescript
@Directive({
  host: {
    '[style.color]': 'badgeColor()',
    '(mouseover)': 'onMouseOver()',
  }
})
```

Is equivalent to the decorator approach:

```typescript
@Directive({})
export class Badge {
  @HostBinding('style.color') get color() {
    return this.badgeColor();
  }
  @HostListener('mouseover') onMouseOver() {
    /* ... */
  }
}
```

### Benefits of the Modern Approach

1. **Better tree-shaking**: Unused host bindings can be removed during build
2. **Improved performance**: No decorator metadata to process at runtime
3. **Cleaner syntax**: All host interactions defined in one place
4. **Signal integration**: Works seamlessly with Angular signals

### Signal Reactivity

Using `signal('black')` creates a reactive value that automatically updates the DOM when changed. The `badgeColor()` call in the host binding creates a reactive dependency.

## Advanced Usage

You can extend this pattern for more complex interactions:

1. **Multiple style bindings**:

   ```typescript
   host: {
     '[style.color]': 'badgeColor()',
     '[style.font-weight]': 'fontWeight()',
     '[class.active]': 'isActive()'
   }
   ```

2. **Event parameters**:

   ```typescript
   host: {
     '(click)': 'onClick($event)',
     '(keydown)': 'onKeyDown($event)'
   }
   ```

3. **Conditional bindings**:
   ```typescript
   host: {
     '[attr.aria-label]': 'isManager() ? "Manager" : null'
   }
   ```

By completing this workshop, you've learned how to create interactive directives using Angular's modern host binding and listening capabilities, making your components more dynamic and user-friendly.
