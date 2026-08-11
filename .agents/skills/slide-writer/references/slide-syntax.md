# Slide Syntax Basics

## Horizontal slide separator

A literal line containing only `##==##` splits one markdown file into multiple reveal.js horizontal slides. There is **no vertical-slide separator used anywhere in this deck** (no precedent for `##--##`/stacks) — only horizontal.

Example, `docs/markdown/13-DEPENDENCY-INJECTION/02-DI-WORKING.md`:

```md
# Principle of DI in Angular
...

##==##

# The Injector
...
```

Put `##==##` on its own line, with a blank line before and after for readability.

## Per-slide configuration: `<!-- .slide: ... -->`

A reveal.js directive comment sets classes/attributes on the generated `<section>`. It must be the **first line** of a slide's markdown, before the `#` heading.

```md
<!-- .slide: class="first-slide" sfeir-level="1" sfeir-techno="Angular" -->

# **Welcome to Sfeir School**
```

```md
<!-- .slide: class="with-code inconsolata" data-type-show="on-stage" -->
```

Multiple classes are space-separated inside the single `class="..."` string. Combine freely, e.g. `class="tc-multiple-columns with-code inconsolata"`.

## Per-element configuration: `<!-- .element: ... -->`

Placed **immediately after** the markdown element it targets (a code fence, an image, a paragraph), it applies classes or inline styles to just that element.

```md
```typescript
providers: [MyService];
```

<!-- .element: class="big-code" -->
```

```md
We need to find a common communication method.

<!-- .element: class="important" -->
```

## No front-matter

There is no YAML/TOML front-matter block anywhere in this deck. All per-slide/per-element configuration goes through `<!-- .slide: -->` and `<!-- .element: -->` comments as described above.
