<!-- .slide -->

# One attribute, two jobs: aliasing an input

A directive's input has its own binding name by default — separate from the selector that activates the directive. `input()`'s `alias` option lets you make them the **same name**, so a single attribute both applies the directive and passes it a value.

<br/>

Not an invented trick: Angular Material's own `MatTooltip` works exactly this way — its selector is `[matTooltip]`, and its message input is aliased to `'matTooltip'` too.

Notes:

- Verified directly against Angular Material's `MatTooltip` source: `selector: '[matTooltip]'`, message input declared as `@Input('matTooltip')` — same alias idea this slide teaches, just via the legacy decorator instead of `input()`.
- This is why `[matTooltip]="'Some text'"` reads so naturally in a template: one attribute, one job to read, even though two things happen (directive activates, value flows in).

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

## Without an alias

```typescript
@Directive({
  selector: '[sfeirHighlight]',
})
export class HighlightDirective {
  enabled = input(false);
}
```

<!-- .element: class="medium-code" -->

```html
<p sfeirHighlight [enabled]="true">...</p>
```

<!-- .element: class="medium-code" -->

Two attributes to read for one concern: one that turns the directive on, one that configures it.

##++##
##++## class="with-code inconsolata"

## With an alias

```typescript
@Directive({
  selector: '[sfeirHighlight]',
})
export class HighlightDirective {
  enabled = input(false, { alias: 'sfeirHighlight' });
}
```

<!-- .element: class="medium-code" -->

```html
<p [sfeirHighlight]="true">...</p>
```

<!-- .element: class="medium-code" -->

One attribute both activates the directive **and** carries its value.

##++##

Notes:

- `enabled` stays the readable name inside the class (`this.enabled()`) — `sfeirHighlight` is only the public, template-facing name, set via `alias`.
- The legacy equivalent is `@Input('sfeirHighlight') enabled = false;` — same alias idea, decorator syntax instead of the `input()` option.
- This pattern only makes sense when the directive has one obviously "main" input — don't alias every input to the selector, just the one the template naturally reads as "the value of this attribute directive".
