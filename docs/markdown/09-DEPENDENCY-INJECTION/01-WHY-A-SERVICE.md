<!-- .slide -->

# `Home` knows too much

Since `06-pipe`, `Home` reaches straight into `PEOPLE_MOCK` to pick the first person and to pick a random one — all of that data-access logic sits **inline in a component**. That component now has two jobs: coordinating the UI, and knowing where people data lives and how to pick from it.

<br/>

> `07-provider` extracts that second job into a proper **service**, `People` — and has `Home` *ask* for what it needs instead of reaching for `PEOPLE_MOCK` itself.

Notes:

- This is the same instinct as extracting `Card` out of `Home` in `05-input-output`: recognize a responsibility that doesn't belong where it currently lives, and give it its own home. There, it was markup. Here, it's data access.

##==##

<!-- .slide: class="with-code inconsolata" -->

# What is a service?

An exported **class**, decorated so Angular's injector knows how to create and hand it out.

<br/>

```typescript
@Injectable({
  providedIn: 'root', // Registers the service at the application root
})
export class TodoService {
  private name = 'Hello';

  getName() {
    return this.name;
  }
}
```

<!-- .element: class="big-code" -->

Notes:

- `providedIn: 'root'` makes the service available throughout the application and tree-shakable — removed from the final bundle if never injected. This has been the recommended way to provide singleton services since Angular 6.
