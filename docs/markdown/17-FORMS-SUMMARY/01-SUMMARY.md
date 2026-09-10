<!-- .slide: class="transition-bg-sfeir-1 underline" -->

# Three forms, one exercise

## The payoff

##==##

<!-- .slide -->

# You built the same form three times

The "Add / Edit person" dialog was implemented identically in behavior across `12-template-form`, `13-reactive-form` and `14-signal-form`: same five fields, same validation rules, same `submitForm`/`cancelForm` contract to the dialog.

<br/><br/>

That repetition was deliberate — it's the only way to feel, not just read about, what each API actually costs and buys you.

##==##

<!-- .slide: class="tc-multiple-columns" -->

##++##

# Template-Driven

- **Template is the source of truth**
- Binding & validation live in the view (`ngModel`, `required`, `#field="ngModel"`)
- Almost no TypeScript — fast to write, hard to unit test in isolation

![](assets/images/school/forms/template_driven.png 'h-350')
##++##
##++##

# Reactive

- **Component class is the source of truth**
- A typed `FormGroup`/`FormControl` tree, validators attached in code
- Easy to unit test, more boilerplate (`PersonForm extends FormGroup`, `ValidatorFn`, CVA for custom controls)

![](assets/images/school/forms/reactive_forms.png 'h-350')
##++##

##==##

<!-- .slide -->

# Signal Forms

- **A plain signal is the source of truth** — the form is a thin layer derived from it
- Validation lives in a **schema function**, reusable via `schema()`/`apply()`
- Custom controls need one `model()` signal, no `ControlValueAccessor`
- Submission wired once via `submission.action`, not a template handler

<br/>

> The newest of the three, and Angular's recommended default for new signal-based apps.

<!-- .element: class="important center" -->

##==##

<!-- .slide: class="with-code" -->

# Side by side

|                        | Template-Driven                | Reactive                                  | Signal Forms                        |
| ---------------------- | ------------------------------ | ----------------------------------------- | ----------------------------------- |
| Source of truth        | The template                   | `FormGroup`/`FormControl`                 | A `WritableSignal`                  |
| Where validation lives | HTML attributes                | `Validators`                              | Schema function                     |
| Custom control         | n/a for custom directives      | `ControlValueAccessor`                    | `FormValueControl`                  |
| Type safety            | Minimal (`any`-ish form value) | Strong, explicit (`FormGroup<Controls>`)  | Strong, **inferred** from the model |
| Testability            | Harder — logic is in the DOM   | Easy — pure class, no DOM needed          | Easy — pure signals, no DOM needed  |
| Boilerplate            | Low                            | Medium–high                               | Low once the schema is written      |
| Best for               | Small, simple forms            | Complex/dynamic forms, existing codebases | New signal-based apps (v22+)        |

##==##

<!-- .slide -->

# So which one do you reach for?

- **Prototyping, a two-field form, a codebase without Reactive/Signal Forms already in it** → Template-Driven<br/><br/>
- **A large existing Reactive-Forms codebase, or a form whose shape changes dynamically at runtime** → Reactive Forms<br/><br/>
- **A new app, already signal-first, on Angular v22+** → Signal Forms, by default<br/><br/>

<br/>

> All three are fully supported — none of this is "deprecated vs modern". Signal Forms is simply where the ecosystem is heading, the same way Reactive Forms once replaced Template-Driven as the "advanced" default.

<!-- .element: class="important center" -->

##==##

<!-- .slide: class="tc-multiple-columns"-->

##++##

# Advantages of moving past Template-Driven

<br/><br/><br/>

- Logic lives in code, not the template
- Easier to unit test
- Type-safe, ready for dynamic/data-driven forms

##++##
##++##

<br/><br/><br/>

![](assets/images/school/forms/avantage_reactive_forms.png 'h-450')
##++##
