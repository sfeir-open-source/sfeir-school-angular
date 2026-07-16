# 26 · Host Binding & Host Listener

> Make the badge directive interactive: it turns red on hover and back to black on mouse-out.

**Folder** `apps/26-hostbinding-hostlistener` · **Solution** `apps/26-hostbinding-hostlistener-solution` · **Run** `npm run client -- 26-hostbinding-hostlistener`

## 🎯 Goal

Extend the `sfeirBadge` directive from exercise 15 so it reacts to mouse events, binding a style on its **host** element and updating it from event handlers — all via the `host` metadata.

## 📚 What you'll learn

- How to bind host properties/styles and listen to host events with the `host` metadata
- How a signal drives a host style binding reactively
- Why `host` metadata is preferred over the `@HostBinding` / `@HostListener` decorators

## ✅ Before you start

- Completion of the custom directive exercise (15)
- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Add a color signal

In `badge.ts`, hold the current color in a signal (start black):

```typescript
import { signal } from '@angular/core';

badgeColor = signal('black');
```

### Step 2 — Declare host bindings & listeners

In the `@Directive` metadata, bind the color and subscribe to mouse events:

```typescript
@Directive({
  selector: '[sfeirBadge]',
  host: {
    '[style.color]': 'badgeColor()',
    '(mouseover)': 'onMouseOver()',
    '(mouseout)': 'onMouseOut()',
  },
})
```

### Step 3 — Implement the handlers

```typescript
onMouseOver(): void {
  this.badgeColor.set('red');
}

onMouseOut(): void {
  this.badgeColor.set('black');
}
```

## ▶️ Run & verify

```bash
npm run client -- 26-hostbinding-hostlistener
```

Open <http://localhost:4200>, go to the list view, and check:

- [ ] Manager badges start black
- [ ] Hovering a badge turns it red
- [ ] Moving away returns it to black

## 💡 Key concepts

- **`host` metadata** — `'[prop]': 'expr'` binds a host property/style; `'(event)': 'handler()'` listens on the host. One place for all host interactions.
- **Signals + host bindings** — reading `badgeColor()` in the binding creates a reactive dependency, so `.set()` updates the DOM automatically.
- **Modern vs decorators** — `host` metadata tree-shakes better and avoids per-instance decorator metadata compared to `@HostBinding`/`@HostListener`.

## 🧯 Troubleshooting

- **Color never changes** — check the binding key is exactly `'[style.color]'` and reads `badgeColor()`.
- **Hover does nothing** — confirm the event keys `'(mouseover)'` / `'(mouseout)'` map to your methods.
- **No badge at all** — this builds on exercise 15; the icon must render first.

## 🚀 Going further

The same `host` block scales to more interactions:

```typescript
host: {
  '[style.color]': 'badgeColor()',
  '[class.active]': 'isActive()',
  '(click)': 'onClick($event)',
}
```
