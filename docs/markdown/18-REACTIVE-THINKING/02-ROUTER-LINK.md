<!-- .slide: class="with-code inconsolata" -->

# Link 1: real navigation with `RouterLink`

`Card` (from `libs/ui/card`) already links to a person's name, their manager, "Locate" and "Edit" — but until now `/people/:id` wasn't a route, so those were plain `href` anchors:

<br/>

```html
<!-- before -->
<a href="/people/{{ person().id }}">{{ person().firstname }}</a>
```

```html
<!-- after -->
<a [routerLink]="['/people', person().id]">{{ person().firstname }}</a>
```

<!-- .element: class="medium-code" -->

Notes:

- `RouterLink` needs to be added to `Card`'s `imports` array — without it Angular renders `[routerLink]` as a dead attribute, no error, just nothing happening on click.
- `mailto:`, `tel:` and external links (e.g. the SFEIR website) stay plain `href`s — `RouterLink` only makes sense for in-app routes the Router itself knows about.

##==##

# Why this actually matters

A plain `<a href="/people/42">` forces the browser to throw away the current document and do a full network round-trip — even though the SPA already knows how to render that view client-side.

<br/>

`[routerLink]` lets the `Router` **intercept the click** and swap views in place:

<br/>

- no full page reload, no re-bootstrapping the whole Angular app<br/><br/>
- the current page stays eligible for the browser's **back/forward cache (bfcache)** — a full navigation invalidates that history entry<br/><br/>
- perceived performance: view swap instead of network round-trip + parse + bootstrap

<br/>

> This is the concrete, measurable payoff of "using the Router properly" — not just cleaner code.

<!-- .element: class="important center" -->
