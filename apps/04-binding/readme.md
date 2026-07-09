# 04 · Data Binding

> Display a person's details in a Material card using Angular's binding syntaxes.

**Folder** `apps/04-binding` · **Solution** `apps/04-binding-solution` · **Run** `npm run client -- 04-binding`

## 🎯 Goal

Take a static card layout and make it **dynamic**: bind a `person` object (name, photo, email, phone…) to the template so the UI reflects your data.

## 📚 What you'll learn

- The four everyday binding syntaxes: interpolation, property, attribute and (later) event binding
- How to hold component data in a **signal** and read it in the template
- Why `NgOptimizedImage` (`[ngSrc]`) is preferred for images

## ✅ Before you start

- You know how to create and render a component (exercises 01–03)

## 🛠️ Steps

### Step 1 — Start from the static markup

The card markup and styles are provided so you can focus on binding:

1. Copy `assets/static/home.component.html` into `home.component.html`.
2. Copy `assets/static/home.component.scss` into `home.component.scss`.

### Step 2 — Expose the data as a signal

In `home.component.ts`, import the modules the template uses, load the `PEOPLE` mock, and hold the first person in a signal:

```typescript
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PEOPLE } from '../../mocks/people.mock';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatCardModule, NgOptimizedImage, MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  person = signal(PEOPLE[0]);
}
```

> 💡 `person` is a **signal**. In the template you **call** it — `person()` — to read the current value.

### Step 3 — Bind the data in the template

Replace the hard-coded values with bindings. A few representative examples:

```html
<!-- Property binding — sets the DOM property, value comes from the expression -->
<img mat-card-image [ngSrc]="person().photo" alt="person-photo" width="128" height="128" />

<!-- Interpolation — text content -->
<mat-card-title>{{ person().firstname }} {{ person().lastname }}</mat-card-title>

<!-- Property binding on href for actionable links -->
<a [href]="'mailto:' + person().email">{{ person().email }}</a>
<a [href]="'tel:' + person().phone">{{ person().phone }}</a>
```

Apply the same idea to every field of the card (entity, manager, links…).

## ▶️ Run & verify

```bash
npm run client -- 04-binding
```

Open <http://localhost:4200> and check:

- [ ] The card shows the first person's photo, name, entity, email and phone
- [ ] The email link opens a mail draft; the phone link is a `tel:` link
- [ ] No error in the DevTools console

## 💡 Key concepts

| Syntax | Example | Use it for |
| --- | --- | --- |
| Interpolation | `{{ person().email }}` | Rendering text |
| Property binding | `[href]="…"`, `[ngSrc]="…"` | Setting a DOM **property** |
| Attribute binding | `[attr.aria-label]="…"` | Attributes with no matching property |
| Event binding | `(click)="…"` | Reacting to user events *(next exercise)* |

- **`[ngSrc]` vs `src`** — `NgOptimizedImage` requires explicit `width`/`height`, lazy-loads by default and prevents layout shift.

## 🧯 Troubleshooting

- **`person is not a function`** — you read `person.photo` instead of `person().photo`. Signals must be called.
- **Image doesn't show / warning in console** — `NgOptimizedImage` needs both `width` and `height` on the `<img>`.
- **Nothing is styled** — make sure you copied `home.component.scss` from `assets/static`.
