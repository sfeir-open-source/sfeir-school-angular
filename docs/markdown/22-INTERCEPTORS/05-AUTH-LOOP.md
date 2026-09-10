# The full auth loop, closed

Four exercises, one continuous mechanism:

<br/>

1. **Login** (`apps/17-guards`): `UserService.login()` writes the username to `sessionStorage['Authorization']`<br/><br/>
2. **Guards** (`apps/17-guards`): `authenticatedGuard` / `notAuthenticatedGuard` read that key to decide who can navigate where<br/><br/>
3. **Resolver** (`apps/18-resolver`): once past the guards, `personResolver` fetches the detail data before the route activates<br/><br/>
4. **Interceptor** (`apps/19-interceptors`): every one of those fetches — and every other call `People` makes — now leaves with an `Authorization` header attached automatically

##==##

# Same session key, three consumers, zero duplication

`sessionStorage['Authorization']` is written **once**, by `UserService.login()`, and read independently by:

<br/>

- A **guard**, to gate navigation<br/><br/>
- An **interceptor**, to authenticate outgoing HTTP calls<br/><br/>

Neither the guard nor the interceptor know about each other — they just happen to agree on where the session lives. That's the shape of a real authentication layer: a single source of truth, consumed by whichever cross-cutting concern needs it.
