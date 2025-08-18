<!-- .slide: class="transition-bg-sfeir-2" -->

# The module

##==##

<!-- .slide-->

# The module: generalities

- Allows grouping of functionalities<br/><br/>
- Since version 14, the module could be optional thanks to standalone components <br/><br/>
- Can be loaded lazily (lazy loading)<br/><br/>
- Good practice: Module architecture according to roles (Root Module, Navigation Module, Feature Module, Shared Module, Core Module ...)

Notes:

- Root Module, generally contains the other modules of the application
- Feature Module, there is one per feature (e.g., user feature => update, creation ...)
- Shared Module, there are also several, one for the whole application and sometimes one in the feature modules
- Core Module, there is one that contains the core of your application (footer, header, loader)
- Warning: services are not put in shared modules !!!!

##==##

<!-- .slide: class="with-code" -->

# The module: its syntax

Like the component, the module definition is done using a class and a decorator
<br/><br/>

```typescript
// app.module.ts
@NgModule({
  imports: [browserModule], // imports all modules here and also standalone components, pipe and directive
  declarations: [AppComponent], // declare components, directives and pipes that are not standalone
  exports: [], // export components, directives, pipes and modules that need to be exposes outside this module
  bootstrap: [AppComponent], // only in root module
  providers: [], // register all your providers
})
export class AppModule {}
```

<!-- .element: class="big-code" -->
