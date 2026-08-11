# Multi-Column Layouts

Columns use the TalkControl "multiple columns" feature from the theme.

## Syntax

1. Add `tc-multiple-columns` to the slide's `<!-- .slide: class="..." -->` directive.
2. Delimit each column with the marker `##++##` on its own line — it both opens a new column and closes the previous one.
3. A trailing `##++##` on its own line closes the last column.
4. A column can carry its own class by writing `##++## class="..."` on the same line as the marker that opens it.

## Example: two code columns

`docs/markdown/13-DEPENDENCY-INJECTION/02-DI-WORKING.md`:

```md
<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Injector Types: ModuleInjector

```typescript
@NgModule({
  declarations: [PeopleAppComponent],
  providers: [ItemService],
  bootstrap: [PeopleAppComponent],
})
export class ItemModule {}
```

<!-- .element: class="medium-code" -->

```typescript
import { Injectable } from '@angular/core';
@Injectable()
export class ItemService {
  name = 'telephone';
}
```

<!-- .element: class="medium-code" -->

##++##
##++## class="with-code inconsolata"

<br/><br/>

```typescript
@NgModule({
  declarations: [PeopleAppComponent],
  bootstrap: [PeopleAppComponent],
})
export class ItemModule {}
```
...
##++##
```

Note the pattern `##++##` then `##++## class="..."` back to back — this closes column 1 and immediately opens column 2 with its own class.

## Example: image column + code column

Same file, later slide:

```md
<!-- .slide: class="tc-multiple-columns" -->

##++##

# Injector Types: ElementInjector

## Hierarchy Injection

![](../../assets/images/school/dependency-injection/DI-module.png 'center h-500')
##++##
##++## class="with-code inconsolata"

<br/><br/><br/><br/>

```typescript
import { NgModule } from '@angular/core';
@NgModule({
  providers: [SimpleService],
})
export class ItemsModule {
  name = 'telephone';
}
```

<!-- .element: class="medium-code" -->

##++##
```

## Example: text column + image column

`docs/markdown/24-STATE-MANAGEMENT/01-INTRODUCTION.md`:

```md
<!-- .slide: class="tc-multiple-columns" -->

##++##

# State Management
- ...

##++##
##++##

<br/><br/><br/>

![](assets/images/school/state-management/redux_concepts.png 'h-500')
##++##
```

## Sizing helper classes

Defined in `docs/scss/angular.scss`, apply via `<!-- .element: class="..." -->` on content inside a column (not on the column marker itself unless it's a slide-level class):

- `.half` — width 50%
- `.tiers` — width 30%
- `.fill-rest` — `flex: 2`

## Rules to follow

- Only add `with-code inconsolata` to a specific column's opening marker (or to the slide-level `.slide:` directive) when that column actually contains code — see [code-blocks.md](code-blocks.md).
- Keep column count to 2 unless an existing example shows more — all real examples in this deck use exactly 2 columns.
