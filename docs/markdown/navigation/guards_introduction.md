<!-- .slide-->
# General Information about Guards

- Verification / or prefetching hook before navigating to a route <br/><br/>
- There are several guards depending on the navigation (2 types: verification, fetching)<br/><br/>
- A guard consists of an Angular service

##==##

<!-- .slide -->
# The different guards

- __CanActivate__: hook before navigating to a route<br/><br/>
- __CanActivateChild__: hook before navigating to a child route<br/><br/>
- __CanDeactivate__: hook when leaving the current route<br/><br/>
- __CanMatch__: hook even before loading the route<br/><br/>
- __Resolve__:  hook for fetching data before navigating to a route<br/><br/>
Notes:
- The first 4 guards are "authorization verification" guards.
- The 5th is really about optimizing your application's display.
