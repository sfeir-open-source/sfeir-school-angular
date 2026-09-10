# The Staff Directory has a login screen... that does nothing

- `apps/17-guards` adds a `Login` component to the app<br/><br/>
- But typing `/home` or `/people` directly in the address bar still works, signed in or not<br/><br/>
- And a signed-in user can navigate straight back to `/login` and see the form again<br/><br/>
- The URL bar is the only thing standing between a visitor and a protected screen — that's not access control, that's a suggestion

##==##

# What is a guard?

- A function the Angular Router **consults before** it acts on a navigation<br/><br/>
- Depending on the kind of guard, it runs before *activating* a route, before *matching* a lazy route, or before activating a *child* route<br/><br/>
- Functionally, a guard is just an injectable function — same shape as the components and services you've already written

##==##

# The different guard types

- **CanActivate**: hook before navigating to a route<br/><br/>
- **CanActivateChild**: hook before navigating to a child of a route<br/><br/>
- **CanMatch**: hook even before the router considers the route a match — before a lazy chunk is even fetched<br/><br/>
- **CanDeactivate**: hook when leaving the current route<br/><br/>
- **Resolve**: not really a guard — a *prefetching* hook, covered in the next module

Notes:

- The first three are the "should this navigation continue" guards; this module focuses on those, since they're what protects the Staff Directory.
