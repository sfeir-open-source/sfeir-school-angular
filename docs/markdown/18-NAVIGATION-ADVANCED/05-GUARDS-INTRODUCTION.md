# General Information about Guards

- Verification / or prefetching hook before navigating to a route <br/><br/>
- There are several guards depending on the navigation (2 types: verification, fetching)<br/><br/>
- A guard consists of an Angular service

##==##

# The different guards

- **CanActivate**: hook before navigating to a route<br/><br/>
- **CanActivateChild**: hook before navigating to a child route<br/><br/>
- **CanDeactivate**: hook when leaving the current route<br/><br/>
- **CanMatch**: hook even before loading the route<br/><br/>
- **Resolve**: hook for fetching data before navigating to a route<br/><br/>

Notes:

- The first 4 guards are "authorization verification" guards.
- The 5th is really about optimizing your application's display.
