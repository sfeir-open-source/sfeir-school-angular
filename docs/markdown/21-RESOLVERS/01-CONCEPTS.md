# The detail screen renders before its data exists

- `/people/:id` today: `PersonDetails` reads the `id` input, kicks off an `rxResource`, and the template branches between a `sfeir-loader` spinner and the real form<br/><br/>
- It works — but the route **activates first**. For a moment, the router has already navigated to `/people/:id` with nothing to show yet<br/><br/>
- What if the router could wait until the data exists, *before* activating the route at all?

##==##

# Prefetching guards: `Resolve`

- Not really about "should this navigation continue" (that's `canActivate`/`canMatch`)<br/><br/>
- About **what data** the component should start with<br/><br/>
- Can return an `Observable`, a `Promise`, or raw data — the router **waits** for it to complete before activating the route

##==##

# Guard vs. resolver

| | A guard | A resolver |
| --- | --- | --- |
| Answers | *Can* this navigation continue? | *What data* does the component start with? |
| Return type | `boolean` / `UrlTree` | The data itself |
| Effect on the component | Never renders, or renders normally | Always renders, already populated |

<br/>

In `apps/18-resolver`, moving the fetch out of `PersonDetails` and into a resolver removes the need for a loading branch in its template entirely.
