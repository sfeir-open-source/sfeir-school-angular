# Special Slide Types

These are the `<!-- .slide: class="..." -->` vocabularies actually used in this deck's content, documented by the vendored theme (`docs/web_modules/sfeir-school-theme/dist/README.md`). Raw HTML (`<div>`, `<h2>`, `<b>`, `<br/>`) is freely mixed into markdown slide bodies where these components need it.

## First slide

`class="first-slide"` with `sfeir-level="1|2|3"` and `sfeir-techno="..."` attributes control the badge shown.

`docs/markdown/12-PROVIDERS/SCHOOL-200.md`:

```md
<!-- .slide: class="first-slide" sfeir-level="2" sfeir-techno="Angular" -->

# **Angular 200**
```

## Speaker slide

`class="speaker-slide"` wraps a `<div class="speaker-slide">` containing a heading, `### subtitle` lines, a `'speaker'` photo, a `'company'` logo, and up to ~6 `'badge'` images (see [images.md](images.md)).

`docs/markdown/00-SPEAKER/00-nicolas-frizzarin.md`:

```md
<div class="speaker-slide">
![](assets/images/speaker/nicolas-frizzarin/nicolas-frizzarin.jpg 'speaker')
![](assets/images/speaker/logo-sfeir-blanc.png 'company')
![](assets/images/speaker/nicolas-frizzarin/GDE-2025-WEB.png 'badge badge')
![](assets/images/speaker/nicolas-frizzarin/GDE-2025-Angular.png 'badge badge')
![](assets/images/speaker/nicolas-frizzarin/MVP.png 'badge badge')
</div>
```

## Transition slides

`class="transition"`, composable with modifiers actually seen in this repo: `blue`, `bg-white`, `bg-blue`, `underline`, `transition-bg-sfeir-1`, `transition-bg-sfeir-1 underline`, `transition-bg-sfeir-2`. (The theme also documents `green`, `left`, `right`, `top`, `bottom`, `bg-green`, `transition-bg-sfeir-3`, `transition-bg-green-1..6`, `transition-bg-blue-1..3`, but only the combos above have precedent in this deck — prefer reusing them.)

`docs/markdown/24-STATE-MANAGEMENT/01-INTRODUCTION.md`:

```md
<!-- .slide: class="transition-bg-sfeir-2" -->

# The Problem
```

Used for `00-TRANSITION-SLIDE.md` files that open a module (see [file-organization.md](file-organization.md)).

## Exercise / lab slides

`class="exercice"` (deliberate French spelling — matches the theme's CSS, do not "correct" it to `exercise`), often combined with `full-center`. Always used for `NN-LAB.md` files.

`docs/markdown/04-COMPONENTS/100-LAB.md`:

```md
<!-- .slide: class="exercice" -->

# Lab 03 : 03-cpt-hierarchy

## Lab<br>

<b>A readme is available in the apps/03-cpt-hierarchy folder</b>

<!-- .element: class="full-center" -->

##==##

# Explanation schema

![](assets/images/school/components/component_schema.png 'full-width')

##==##

 <!-- .slide: class="exercice full-center" -->

# Lab 03 : 03-cpt-hierarchy

## Lab

<b>apps/03-cpt-hierarchy-solution</b>
```

## `sfeir-basic-slide`

Base class for regular content slides — mostly implicit/default (rarely written explicitly). Affects `list-style-position` for bullet lists per `docs/scss/custom-directive.scss`. No action needed unless mimicking one of the few files that set it explicitly.

## Theme capabilities with no precedent in this repo

The theme README also documents admonitions, quote slides, QR codes, icon fonts (`tc-icons`, feather/material/fontawesome), and a "blur area" pause slide (`class="bg-blur"`), plus `<!-- .element: style="--tc-icon-size:300px; --tc-icon-color:var(--light-grey);" -->` for icon sizing. **None of these appear anywhere in `docs/markdown/`.** Treat them as available-but-unused — do not introduce them unless the user explicitly asks for that specific theme feature, and prefer matching an existing pattern from this file first.
