<!-- .slide: class="transition-bg-sfeir-2" -->

# Providing and injecting the store

##==##

<!-- .slide: class="with-code inconsolata" -->

# Not provided anywhere, by default

A `signalStore()` is just an injectable class — nothing registers it with any injector automatically. You must add it to a `providers: [...]` array before injecting it, exactly like any other service without `providedIn: 'root'`.

```typescript
@Component({
  selector: 'sfeir-staff-directory',
  providers: [StaffDirectoryStore], // 👈 component-scoped: created/destroyed with this component
})
export class StaffDirectory {
  protected readonly _store = inject(StaffDirectoryStore);
}
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Or globally, with `providedIn: 'root'`

```typescript
export const StaffDirectoryStore = signalStore(
  { providedIn: 'root' }, // 👈 first argument to signalStore, before any feature
  withState(INITIAL_STATE),
);
```

<!-- .element: class="big-code" -->

A root-provided store is a true app-wide singleton — one instance, ever, injectable from anywhere without a `providers` array. Great for state that's genuinely global (current user, feature flags); wrong for state that should reset per visit, like a route's list view.

##==##

# Which one for `StaffDirectoryStore`?

Neither, actually — a **third scope**: the store is provided on the **route**, not the component and not root. You'll see exactly how and why a few slides from now, once `withMethods` and `withHooks` are in place — route-level provision is what makes the initial `getPeople()` call and the store's lifecycle line up with navigating in and out of `/people`.
