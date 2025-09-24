<!-- .slide: class="transition-bg-sfeir-2" -->

# NGRX

##==##

<!-- .slide: class="with-code inconsolata" -->

# NGRX: Installation

Like NGXS, NGRX is an external library for Angular.
<br/><br/>

**Installation**:

```sh
npm install @ngrx/store --save

# or use the Angular CLI
ng add @ngrx/store
```

<!-- .element: class="small-code" -->

**Import**:

```typescript
// For module-based applications
@NgModule({
  imports: [StoreModule.forRoot({ counterStore: CounterReducer })],
})
export class AppModule {}

// For standalone applications
bootstrapApplication(AppComponent, {
  providers: [provideStore({ counterStore: counterStore })],
});
```

<!-- .element: class="small-code" -->

##==##

# NGRX: Concepts

4 key concepts: <br/><br/>

- **Actions**: Describe unique events that are dispatched from components or services. <br/><br/>
- **Reducers**: Handle state changes by taking the current state and the latest action to produce a new state. <br/><br/>
- **Selectors**: Pure functions used to select, derive, and compose pieces of state. <br/><br/>
- **Store**: A global, observable state container, accessible to all components.

##==##

# NGRX: Global Architecture

![](assets/images/school/state-management/ngrx/state_management_lifecycle.png 'h-800')

<!-- .element: class="full-center" -->
