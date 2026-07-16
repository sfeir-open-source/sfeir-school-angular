# 12 · Using Built-in Pipes

> Format a person's birth date in the template with Angular's `DatePipe`.

**Folder** `apps/12-pipe-using` · **Solution** `apps/12-pipe-using-solution` · **Run** `npm run client -- 12-pipe-using`

## 🎯 Goal

Display the raw `birthDate` as a human-friendly `dd/MM/yyyy` string — without touching the data — using a **pipe** directly in the template.

## 📚 What you'll learn

- What pipes are and when to use them
- How to import and apply a built-in pipe (`DatePipe`)
- The pipe syntax, including parameters and chaining

## ✅ Before you start

- Start the mock API: `npm run server:start`

## 🛠️ Steps

### Step 1 — Import the DatePipe

Pipes are standalone: add `DatePipe` to the card component's `imports`:

```typescript
import { DatePipe } from '@angular/common';

@Component({
  // …
  imports: [MatCardModule, MatIconModule, MatButtonModule, NgOptimizedImage, DatePipe],
})
export class CardComponent { /* … */ }
```

### Step 2 — Apply it in the template

In `card.component.html`, format the birth date where it's displayed:

```html
<div class="contact-info">
  birthDate <a href="birthDate">{{ person().birthDate | date: 'dd/MM/yyyy' }}</a>
</div>
```

The `|` applies the pipe; `'dd/MM/yyyy'` is the format argument.

## ▶️ Run & verify

```bash
npm run client -- 12-pipe-using
```

Open <http://localhost:4200> and check:

- [ ] The birth date renders as day/month/year, e.g. `25/12/1990`
- [ ] The underlying value is unchanged — only the display is transformed

## 💡 Key concepts

- **Pipe syntax** — `{{ value | pipeName:arg1:arg2 }}`. Pipes are pure functions that transform a value for display only.
- **Chaining** — `{{ value | date:'shortDate' | uppercase }}` feeds each result into the next pipe.
- **Common built-ins** — `date`, `uppercase` / `lowercase`, `currency`, `decimal`, `percent`, `json`, `async`.

## 🧯 Troubleshooting

- **`No pipe found with name 'date'`** — you didn't add `DatePipe` to the component `imports`.
- **Wrong output** — double-check the format tokens (`dd` day, `MM` month, `yyyy` year — case matters).
- **`Invalid Date`** — the source value must be a `Date`, an ISO string or an epoch number.
