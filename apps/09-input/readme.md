# 09 · Component Inputs

> Extract a reusable `CardComponent` and feed it data from a parent through an `input`.

**Folder** `apps/09-input` · **Solution** `apps/09-input-solution` · **Run** `npm run client -- 09-input`

## 🎯 Goal

The person card is currently duplicated between the Home and People views. Extract it into a single `sfeir-card` component that receives its data from the outside — the foundation of reusable, composable UI.

## 📚 What you'll learn

- How to define a component **input** with the signal-based `input()` / `input.required()`
- How to pass data from parent to child with property binding
- How component composition removes duplication

## ✅ Before you start

- Completion of the `@for` exercise (08-ng-for)
- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Create the Card component

Generate `CardComponent` in `shared/components/card`, move the card markup and styles into it, and declare a required `person` input:

```typescript
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { People } from '../../models/people.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'sfeir-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [MatCardModule, MatIconModule, MatButtonModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  person = input.required<People>();
}
```

> 💡 `input()` returns a **read-only signal**, so the card template reads `person()` exactly like the component did before.

### Step 2 — Use the card in the People view

In `people.component.html`, replace the inline card markup with the new component, passing each person via property binding:

```html
@for (person of people(); track person.id) {
  <sfeir-card [person]="person" />
} @empty {
  No people for the moment
}
```

Don't forget to add `CardComponent` to the People component's `imports`.

### Step 3 — Use the card in the Home view

Do the same in `home.component.html`, passing the random person:

```html
<sfeir-card [person]="person()" />
```

## ▶️ Run & verify

```bash
npm run client -- 09-input
```

Open <http://localhost:4200> and check:

- [ ] Home shows the random person **through** the card component
- [ ] The People list shows every person using the **same** card
- [ ] Refresh on Home still works; layout and styling are unchanged

## 💡 Key concepts

- **`input.required<T>()`** — a required input: Angular errors at build time if a parent forgets to pass it. Use `input<T>(defaultValue)` for optional ones.
- **Signal inputs** — inputs are signals, so they play nicely with `computed`, `effect` and `OnPush` change detection.
- **Presentational components** — `CardComponent` only receives data and renders it. It doesn't know where the data comes from, which makes it reusable anywhere.

## 🧯 Troubleshooting

- **`person` is undefined** — a required input must be bound: `[person]="…"`. Check the binding exists in every parent.
- **`sfeir-card` unknown element** — add `CardComponent` to the parent's `imports`.
- **Styles missing** — make sure the card's `.scss` moved with the markup.
