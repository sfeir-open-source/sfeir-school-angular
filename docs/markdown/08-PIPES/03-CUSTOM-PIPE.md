<!-- .slide: class="transition-bg-sfeir-2" -->

# Creating your own pipe: `na`

##==##

# How a pipe is composed

- A class decorated with `@Pipe`, which has a mandatory `name` — that's what templates call after the `|` <br/><br/>
- The class implements `PipeTransform`'s `transform()` method: the piped value comes in as the **first parameter**, anything after the pipe's `:` comes in as **additional parameters**, in order <br/><br/>
- `transform()` always **returns a new value** — it never mutates its input <br/><br/>
- Standalone by default: import it into a component's `imports` array, no `NgModule`

##==##

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

## `libs/ui/na/na.ts`

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'na' })
export class Na implements PipeTransform {
  transform(value: string | undefined, fallback = 'n/a'): string {
    return value ? value : fallback;
  }
}
```

<!-- .element: class="medium-code" -->

##++##
##++## class="with-code inconsolata"

<br/><br/><br/>

## `libs/ui/card/card.html`

```html
<span>{{ person().manager | na : 'No manager assigned' }}</span>
```

<!-- .element: class="medium-code" -->

<br/>

- No argument → falls back to `'n/a'`
- With an argument → the caller overrides the message per usage

##++##

Notes:

- `na` lives as its own secondary entry point of `@sfeir/ui` (`@sfeir/ui/na`) — the same pattern already used for `@sfeir/ui/card`. One focused pipe, one focused import path.
- Giving `fallback` a default value (`= 'n/a'`) means `| na` (no argument at all) still works — the second parameter is genuinely optional, exactly like an optional function parameter anywhere else in TypeScript.

##==##

<!-- .slide -->

# A pipe's `transform()` contract, generalized

| Template                              | `transform()` call                    |
| -------------------------------------- | -------------------------------------- |
| `{{ value }}`                          | n/a (no pipe)                          |
| `{{ value \| na }}`                    | `transform(value)`                     |
| `{{ value \| na : 'custom message' }}` | `transform(value, 'custom message')`   |
| `{{ value \| slice : 1 : 3 }}`         | `transform(value, 1, 3)` (built-in pipe, same contract) |

> Whether the pipe ships with Angular (`date`, `slice`, `currency`) or you wrote it yourself, the calling convention is identical — that consistency is exactly why pipes are easy to chain and compose.
