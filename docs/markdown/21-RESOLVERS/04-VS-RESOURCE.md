# Wait — didn't `resource`/`rxResource` already solve loading?

On Day 2 you learned `httpResource`/`rxResource` precisely to get `isLoading()`, `hasValue()`, `error()` **inside** a component, so a template can branch cleanly instead of juggling manual flags.

<br/><br/>

That's still the right tool when a component fetches **on its own** (a refresh button, a search box, `Home`'s random person). A resolver solves a **different** problem.

##==##

# Two different moments to handle "loading"

| | `resource` / `rxResource` | A route `resolve` |
| --- | --- | --- |
| The fetch starts | Inside the component, after it renders | Before the router even activates the route |
| The component | Must handle a loading state in its template | Never sees a loading state — it always starts populated |
| Best for | Data the component controls the *timing* of | Data the route itself depends on to make sense at all |

<br/>

`PersonDetails` in `apps/18-resolver` moved from the left column to the right one — and its template got simpler *because* the loading state moved out of the component entirely, into the router.

##==##

# The payoff: "guaranteed data on render"

- No `@if (hasValue()) { } @else { loader }` split to keep in sync<br/><br/>
- No brief flash of an empty/loading detail screen while the URL has already changed<br/><br/>
- The trade-off: the **previous** screen stays visible a little longer while the resolver runs — the router won't activate `PersonDetails` until the person has actually arrived

Notes:

- Try it with the Network tab throttled to "Slow 3G": the URL bar updates, but the browser stays on the previous screen until the form is ready — that's the resolver holding the navigation, not a bug.
