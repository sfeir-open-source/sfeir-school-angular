<!-- .slide: class="transition-bg-sfeir-2" -->

# NGXS

##==##

<!-- .slide: class="with-code inconsolata" -->

# First Steps

**NGXS** is an external library for Angular, so it must be installed as a project dependency.

```sh
npm install @ngxs/store --save
# or use the Angular CLI
ng add @ngxs/store
```

<!-- .element: class="medium-code" -->
<br/>

And import it into our project:
<br/>

```typescript
// For Application based on standalone components
bootstrapApplication(App, {
  providers: [provideStore([ZooState])],
});

// For Application based on modules
@NgModule({
  imports: [NgxsModule.forFeature([ZooState])],
})
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="two-column" -->

# Key Concepts of NGXS

- Store <br/><br/>
- Actions <br/><br/>
- State <br/><br/>
- Selects <br/><br/>

##--##

<br/><br/><br/>

![h-550](assets/images/school/state-management/ngxs/ngxs_concepts.png)

Notes:

- **Store**: A global container for state, actions, and selectors.
- **State**: A class defining a slice of the application state.
- **Actions**: Classes that describe the state changes to be performed.
- **Selects**: Functions that retrieve slices of the state.
