<!-- .slide: class="with-code inconsolata" -->

# Automatic migration using a simple command

<br/><br/><br/>

```shell
ng generate @angular/core:control-flow
```

<!-- .element: class="big-code center" -->

##==##

# Benefits of the new syntax

- **Clearer and more intuitive**: The syntax is closer to native JavaScript control flow. <br/><br/>
- **No more microsyntax**: Eliminates the complex grammar of `let`, and `of`. <br/><br/>
- **Improved type checking**: The compiler can better infer types within the blocks. <br/><br/>
- **Built-in**: Control flow is part of the core framework, no need to import `CommonModule` for `@if`, `@for`, etc.
