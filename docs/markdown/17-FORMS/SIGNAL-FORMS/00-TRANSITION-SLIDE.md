<!-- .slide: class="transition" -->

# Signal Forms

## The signal-first way to build forms (Angular v22+)

##==##

<!-- .slide -->

# Why a third forms API?

- Template-driven and Reactive forms predate **Signals**<br/><br/>
- They rely on `NgModel` / `FormControl` and `Observables` as the source of truth<br/><br/>
- Modern Angular is **signal-first**: components, inputs, state, resources...<br/><br/>
- **Signal Forms** make the form a thin reactive layer **on top of your own signal model**

Notes:

- Signal Forms shipped as **stable in Angular v22** inside the existing `@angular/forms` package (sub-path `@angular/forms/signals`).
- The goal is to unify the ergonomics of template-driven forms (simple, model-based) with the power and testability of reactive forms (logic in code), using signals as the single reactivity primitive.
- It is fully interoperable: you can adopt it incrementally next to reactive/template forms.
