# The "List" link is still dead

`/home` works now, but the toolbar's **"List"** link (`/people`) has been dead since `09-router` — clicking it changes the URL but renders nothing, exactly like `/locator` still does today.

<br/><br/>

`apps/10-control-flow` brings it to life with a brand-new `StaffDirectory` feature: it lists **every** person, not just one, and can switch between a card grid and a Material list. To build that template, we reach for Angular's built-in **control flow blocks**.

##==##

# A control flow directly in the framework

Since Angular 17, control flow is an integral part of the framework and its templating compiler:

<br/><br/>

- increased performance <br/><br/>
- no more `NgIf`/`NgFor`/`NgSwitch` imports, no `CommonModule` dependency<br/><br/>
- a lighter bundle

##==##

# The new `@`-block syntax

- Replaces the old `*` microsyntax for structural directives.<br/><br/>
- Cleaner, more intuitive, and more powerful way to manage control flow.<br/><br/>
- The `let`/`of` microsyntax and the implicit `$implicit` context variable are no longer needed the same way — blocks read like plain JavaScript control flow.
