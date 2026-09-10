<!-- .slide: class="transition" -->

# Forms

##==##

<!-- .slide-->

# The problem with forms

- Collect data entered by the user<br/><br/>
- Validate it before it goes anywhere<br/>

Notes:

- Even with front-end validation, server-side validation is still mandatory — never trust the client.

##==##

<!-- .slide -->

# Three ways to build a form in Angular

The staff directory needs an "Add / Edit person" form. We're going to build it **three times**, once per exercise, with each of Angular's forms APIs:

<br/><br/>

- **Template-driven forms** (this module) — the form is driven by the template<br/><br/>
- **Reactive forms** (next module) — the form is driven by component logic<br/><br/>
- **Signal Forms** (after that) — the form is driven by a plain signal model

<br/>

> Same fields, same validation rules, same dialog — three different mental models. The comparison at the end of this chapter is the whole point.

<!-- .element: class="important center" -->
