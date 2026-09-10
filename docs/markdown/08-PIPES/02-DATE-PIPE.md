<!-- .slide: class="with-code inconsolata" -->

# `DatePipe`: formatting the date of birth

`06-pipe` adds a date-of-birth row to `Card`. Piped through Angular's built-in `date` pipe, with a format-string parameter:

<br/>

```html
<!-- libs/ui/card/card.html -->
<span>{{ person().birthDate | date : 'dd/MM/yyyy' }}</span>
```

<!-- .element: class="big-code" -->

```typescript
// libs/ui/card/card.ts
import { DatePipe } from '@angular/common';

@Component({
  selector: 'sfeir-card',
  imports: [DatePipe /* ... */],
})
export class Card {}
```

<!-- .element: class="medium-code" -->

Notes:

- `DatePipe` isn't global — like every standalone pipe, it must be imported from `@angular/common` and added to `Card`'s `imports` array before `| date` compiles.
- Common format strings: `'short'`, `'medium'`, `'fullDate'`, or a custom pattern like `'dd/MM/yyyy'` (day/month/year) — check `DatePipe`'s docs for the full token table.

##==##

<!-- .slide -->

# Why pipe it instead of formatting in the class?

- The **model** (`Person.birthDate`) stays a plain, storable value — no display concerns baked into your data <br/><br/>
- The **display format** stays a template concern, next to the markup it affects, easy to change without touching the component's TypeScript <br/><br/>
- `DatePipe` handles locale, time zones and edge cases (leap years, invalid dates) that a hand-rolled formatter would get wrong eventually

> The same logic applies to every built-in pipe: `currency`, `percent`, `titlecase` — keep formatting in the template, keep data pristine in the class.
