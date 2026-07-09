# 05 · Handling Events

> Wire a button so clicking it swaps the displayed person for a random one.

**Folder** `apps/05-events` · **Solution** `apps/05-events-solution` · **Run** `npm run client -- 05-events`

## 🎯 Goal

Add interactivity to the card from exercise 04: a floating refresh button that picks a random person and updates the view — your first **event binding** and your first signal **update**.

## 📚 What you'll learn

- How to bind to DOM events with `(event)="handler()"`
- How to write an event-handler method on the component
- How to update a signal with `.set()` and watch the template react automatically

## ✅ Before you start

- Completion of the binding exercise (04-binding)

## 🛠️ Steps

### Step 1 — Bind the click event

In `home.component.html`, find the floating action button (FAB) with the refresh icon at the bottom, and bind its click to a `getRandomPerson()` method:

```html
<button mat-fab color="accent" (click)="getRandomPerson()">
  <i class="material-icons">autorenew</i>
</button>
```

> 💡 `( )` around an event name means **event binding** — the expression runs when the event fires.

### Step 2 — Implement the handler

In `home.component.ts`, add the method. It picks a random entry from `PEOPLE` and pushes it into the signal:

```typescript
getRandomPerson(): void {
  this.person.set(PEOPLE[Math.floor(Math.random() * PEOPLE.length)]);
}
```

Because the template reads `person()`, updating the signal with `.set()` re-renders the card — no manual DOM work, no change-detection call.

## ▶️ Run & verify

```bash
npm run client -- 05-events
```

Open <http://localhost:4200> and check:

- [ ] Clicking the refresh button (bottom-right) shows a different person each time
- [ ] The whole card updates: photo, name, email, phone, manager
- [ ] No error in the DevTools console

## 💡 Key concepts

- **Event binding** — `(click)`, `(input)`, `(keyup)`… bind template events to component methods. `$event` gives you the DOM event object when you need it.
- **Signal updates** — `.set(value)` replaces the value; `.update(fn)` derives the next value from the current one. Reading `person()` in the template creates the dependency that triggers the re-render.

## 🧯 Troubleshooting

- **Nothing happens on click** — check the parentheses in the template: `(click)="getRandomPerson()"` (call with `()`).
- **`Cannot set property of…`** — use the signal API `this.person.set(…)`, not `this.person = …`.
- **Same person keeps appearing** — that's random chance; keep clicking, or verify the index math uses `PEOPLE.length`.
